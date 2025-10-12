import  NextAuth  from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { db } from "@/lib/db"

const handler = NextAuth({
    session:{
        strategy: 'jwt'
    },
    pages:{
        signIn: '/login'
    },
    providers:[
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }
                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials');
                }
                const isCorretPassword = await compare(
                    credentials.password,
                    user.hashedPassword
                );
                if (!isCorretPassword) {
                    throw new Error('Invalid credentials');
                }
                return user;
            },
        }),
    ]
})

export { handler as GET, handler as POST }
