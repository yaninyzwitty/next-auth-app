
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import bcrypt from 'bcryptjs'
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByToken, getUserByEmail, getUserById } from "./data/user"
import { prisma } from "./lib/prisma"
import { LoginSchema } from "./schemas"

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt'
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    
  }

  }, 
 
  callbacks: {
    async signIn({ user, account }) {

      // Allow OAuth without email verification

      if (account?.provider !== "credentials") return true;

      if(!user || !user.id) return false;

      const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        });
      }

      return true;
    },
    session: async ({ token, session }) => {

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email  = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;

    },
    jwt: async ({ token  }) => {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByToken(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;


      return token;
    }

  },
  providers: [
    Google,
    GitHub,
    Credentials({
      authorize: async(credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if(!validatedFields.success) return null;

        const { email, password  } = validatedFields.data;


        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch) return null;
        
        return user;
      }

    })
  ],
})