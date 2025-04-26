import { DBConnect } from "@/app/lib/DB";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  DBConnect();

  try {
    const deletingData = await Post.findByIdAndDelete(id);

    const postProvider = await User.findOne({ _id: id });

    const postInfo = postProvider.posts.filter((item: any) => {
      return item.providerId !== id;
    });

    postProvider.posts = postInfo;
    await postProvider.save();

    console.log("this is the filtered posts", postInfo);

    if (deletingData) {
      return NextResponse.json({ message: "Post has been successfully deleted" });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};