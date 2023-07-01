import { db } from '@/lib/db'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, User, getServerSession } from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { AdapterUser } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email'},
                password: { label: 'Password', type: 'password'},
                username: { label: 'Username', type: 'text', placeholder: 'Username', required: false},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) {
                   throw new Error('Invalid credentials');
                }

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                });
                if(!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials')
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword);

                if(!isCorrectPassword) {
                    throw new Error('Invalid credentials')
                }

                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.username = token.username
                session.user.isSeller = token.isSeller
            }

            return session
        },
        async signIn({ user }: { user: AdapterUser | User }) {
            try {
                return true
            } catch (error: any) {
                console.log(error)
                return false
            }
        },

        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,
                },
            })

            if (!dbUser) {
                token.id = user!.id
                return token
            }

            if (!dbUser.username) {
                await db.user.update({
                    where: {
                        id: dbUser.id,
                    },
                    data: {
                        username: nanoid(10),
                    },
                })
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
                username: dbUser.username,
                isSeller: dbUser.isSeller,
            }
        },
        redirect() {
            return '/'
        },
    },
}

export const getAuthSession = () => getServerSession(authOptions)