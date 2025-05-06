"use server"
import { DBConnect } from "@/app/lib/DB";
import User from "@/models/user";
import {hash} from "bcryptjs"
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import Post from "@/models/post";



export const Login = async (formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });

    if (res?.ok) {
      redirect("/"); 
    } else {
      return "Invalid credentials";
    }

  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause || "Something went wrong";
  }
}



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
 

  const hashPassword = await hash(password, 10);
  await User.create({ username, email, password: hashPassword, role });
  
  console.log("user created")
  redirect("/Authentication/SignIn")
};

export const getAllPost = async (input:string) => {
  DBConnect();
  console.log(input)
  const fiter = input ? {title:{$regex:input, $options:"i"}}:{}
  console.log(fiter)
  const allPosts = await Post.find(
    fiter
  );
  const postsWithStringIds = allPosts.map(post => ({
    ...post.toObject(), 
    _id: post._id.toString(), 
  }));
  return postsWithStringIds;
};

export const getUserAppointedPost = async (clientId: string) => {
  DBConnect();
  console.log("clientId", clientId);

  const filter = clientId ? { customer: { $in: [clientId] } } : {};

  const allPosts = await Post.find(filter);
 console.log(allPosts)
  const postsWithStringIds = allPosts.map(post => {
    const plainPost = post.toObject();
    return {
      ...plainPost,
      _id: plainPost._id.toString(),
      customer: plainPost.customer.map((id: any) => id.toString()),
    };
  });

  return postsWithStringIds;
};

