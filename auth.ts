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
       authorize:async(credentials:any)=>{
        const email = credentials.email as string;
        const password = credentials.password 

        if(!email || !password){
          throw new CredentialsSignin("please provide both email and password")
        }
        await DBConnect()
          const findingUser = await User.find({email}).select("+password +role")

          if(!findingUser){
            throw new Error("invalid email or password")
          }
          if(!password){
            throw new Error("invalid password")
          }

          const comparingPassword = await compare(password, findingUser.password);

          if(!comparingPassword){
            throw new Error("password did not matched")
          }

          const data={
            username: findingUser.username,
            role:findingUser.role,
            email:findingUser.email,
          }
      },
      
    }),
  ]
});
