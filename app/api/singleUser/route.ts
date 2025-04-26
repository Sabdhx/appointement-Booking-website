import { DBConnect } from "@/app/lib/DB";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const _id = searchParams.get("id")?.toString()
  await DBConnect();
  const user = await User.findById({ _id })
  console.log(user);
  return NextResponse.json({message:"hey there the api is fetched",user})
}

