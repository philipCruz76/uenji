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
    

}

export const getAuthSession = () => getServerSession(authOptions)