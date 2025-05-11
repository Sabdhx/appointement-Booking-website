import { DBConnect } from "@/app/lib/DB";
import Post from "@/models/post"
import { NextResponse } from "next/server";

export async function GET(){
  DBConnect()
  const findingCatagries = await Post.find()
  const mappingFilter = findingCatagries.map((item)=>{
    return(
      item.businessType
    )
  })
  const filteredData = [...new Set(mappingFilter)]
  console.log(filteredData)
  return NextResponse.json({message:filteredData})
}