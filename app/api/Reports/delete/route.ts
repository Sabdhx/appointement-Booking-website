import { DBConnect } from "@/app/lib/DB";
import Report from "@/models/reports"
import {  NextResponse } from "next/server";

export const DELETE=async(request:Request)=>{
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  console.log(id);

  console.log("first")
  DBConnect();

  if(!id){
    return NextResponse.json("please enter a valid id")
  }
  const result = await Report.findByIdAndDelete(id);
  return NextResponse.json({message:"Report deleted Successfully"})
}