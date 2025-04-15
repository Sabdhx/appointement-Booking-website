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

        // ✅ Use findOne instead of find
        const user = await User.findOne({ email }).select("+password +role");

        // ✅ Check if user exists
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // ✅ Compare password
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Password did not match");
        }

        // ✅ Return user info to be stored in session
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
