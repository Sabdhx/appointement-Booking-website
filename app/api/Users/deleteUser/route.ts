import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const UserFind = await User.findOne({_id:id})
    console.log("UserFind",UserFind)
    if(UserFind){
      const postFinder = await Post.findByIdAndDelete({providerId:id})
        console.log("postFinder",postFinder)
    }
    // await User.findByIdAndDelete(id);
 
  
    // return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
};
