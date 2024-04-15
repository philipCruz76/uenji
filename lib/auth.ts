import db from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvier from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvier({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const bcrypt = require("bcryptjs");
          const dbUser = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!dbUser || !dbUser?.hashedPassword) {
            throw new Error("Invalid credentials");
          }

          if (!dbUser.active) {
            throw new Error("User is not active. Please check your email.");
          }

          if (!dbUser.username) {
            const emailParts = dbUser.email?.split("@");
            if (emailParts) {
              let derivedUsername = emailParts[0].replace(/[^a-zA-Z0-9]/g, "");

              await db.user.update({
                where: {
                  id: dbUser.id,
                },
                data: {
                  username: derivedUsername,
                },
              });
            }
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            dbUser.hashedPassword,
          );

          if (!isCorrectPassword) {
            throw new Error("Invalid credentials");
          }

          return dbUser;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  events: {
    async signIn(session) {
      try {
        await db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            isOnline: true,
          },
        });
      } catch (error: any) {
        console.error(error);
      }
    },
    async signOut(session) {
      try {
        if (session.token.isSeller) {
          await db.user.update({
            where: {
              id: session.token.id,
            },
            data: {
              isOnline: false,
              sellerView: true,
            },
          });
        } else {
          await db.user.update({
            where: {
              id: session.token.id,
            },
            data: {
              isOnline: false,
            },
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isSeller = token.isSeller;
        session.user.image = token.picture;
        session.user.isOnline = token.isOnline;
        session.user.username = token.username;
        session.user.isActive = token.isActive;
        session.user.sellerView = token.sellerView;
        session.user.gigIds = token.gigIds;
        session.user.conversationIds = token.conversationIds;
      }
      return session;
    },

    async jwt({ token, user, trigger }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
        include: {
          conversations: true,
          Gig: true,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (trigger === "signUp") {
        if (!dbUser.username) {
          const emailParts = dbUser.email?.split("@");
          if (emailParts) {
            let derivedUsername = emailParts[0].replace(/[^a-zA-Z0-9]/g, "");
            const userNameExists = await db.user.findUnique({
              where: {
                username: derivedUsername,
              },
              select: {
                username: true,
              },
            });

            if (userNameExists !== null) {
              const randomTwoDigitNumber = Math.floor(Math.random() * 90 + 10);
              derivedUsername = `${derivedUsername}_${randomTwoDigitNumber}`;
            }

            await db.user.update({
              where: {
                id: dbUser.id,
              },
              data: {
                username: derivedUsername,
              },
            });
          }
        }
      }

      const gigIds = dbUser.Gig.map((gig) => gig.id);
      const conversationIds = dbUser.conversations.map(
        (conversation) => conversation.id,
      );

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        isSeller: dbUser.isSeller,
        picture: dbUser.image,
        username: dbUser.username,
        isOnline: dbUser.isOnline,
        isActive: dbUser.active,
        sellerView: dbUser.sellerView,
        gigIds: gigIds,
        conversationIds: conversationIds,
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
