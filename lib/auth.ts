import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
          const bcrypt = require("bcrypt");
          const dbUser = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!dbUser || !dbUser?.hashedPassword) {
            throw new Error("Invalid credentials");
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
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isSeller = token.isSeller;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
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

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        isSeller: dbUser.isSeller,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },
    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
