import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import User from "./models/user";
import { DBConnect } from "./app/lib/DB";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any) => {
        const email = credentials.email as string;
        const password = credentials.password as string;
        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password");
        }
        await DBConnect();
        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          throw new Error("Invalid email or password");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Password did not match");
        }
        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});