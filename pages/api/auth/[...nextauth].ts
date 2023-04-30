import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"
import prisma from '@/app/libs/prismadb'


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as String,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as String,
    }),
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: { label: 'email', type: 'text' },
            password: { label: 'password', type: 'password' }
        },
        async authorize(credentials) {
            if(!credentials?.email || !credentials?.password){
                throw Error('invalid credentials');
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            });

            if(!user || !user?.password){
                throw new Error('Invalid credentials')
            }

            const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
            );

            if(!isCorrectPassword) {
                throw new Error('Invalid credentials');
            }
            return user;
        }
    }),
  ],
    
  // if any error happens. redirect to sign in home pase
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)