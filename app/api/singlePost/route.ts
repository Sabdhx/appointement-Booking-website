import Post from "@/models/post";
import { NextResponse } from "next/server";

export const GET=async(request:Request)=>{
  const {searchParams} = new URL(request.url);
  const _id = searchParams.get("id")?.toString()
 
    try {
      const post = await Post.findById({_id});
      return NextResponse.json({message:"post been fetched successfully",post})
    } catch (error) {
      console.log(error.message)
      return NextResponse.json({message:error.message});
    }

  
}