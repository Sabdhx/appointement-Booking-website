"use server"

import { DBConnect } from "@/app/lib/DB";
import User from "@/models/user";
import { redirect } from "next/navigation";
import NextError from "next/error";
import {hash} from "bcryptjs"
export const registration = async (formData: FormData) => {
  const username = formData.get("username") as string || null
  const email = formData.get("email") as string || null
  const password = formData.get("password") as string 
  const role = formData.get("role") as string 

  await DBConnect();
  const findingUser = await User.findOne({ email });
  if (findingUser) {
    throw new Error("user already exists");
  }
  const hashPassword = await hash(password, 10)


  const createUser =await User.create({username,email,password:hashPassword,role});
  console.log("user created")
  redirect("/Authentication/SignIn")
};

