import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginFn } from '~/api/authApi'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials, req) {
        if (credentials) {
          const { data, status } = await loginFn({
            email: credentials.email,
            password: credentials.password,
          })

          if (status === 200) {
            return data
          } else return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
  pages: {
    signIn: '/auth',
    signOut: '/auth',
  },
}

export default NextAuth(authOptions)
