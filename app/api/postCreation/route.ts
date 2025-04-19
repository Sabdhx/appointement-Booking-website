// app/api/postCreation/route.ts
import { DBConnect } from "@/app/lib/DB";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await DBConnect();

    const createdPost = await Post.create(body);
    return NextResponse.json(createdPost); // return the created post
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
  // try {
  //   console.log("Data being sent to DB:", data);
  //   await DBConnect();
  //   const creatingPost = await Post.create(data);
  //   NextResponse.json({data:creatingPost})

  // } catch (error) {
  //   console.error("Error creating post:", error);
  //   throw new Error("Error creating post");
  // }