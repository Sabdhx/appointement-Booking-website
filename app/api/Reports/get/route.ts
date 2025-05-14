import Report from "@/models/reports"
import {  NextResponse } from "next/server";

export const GET=async()=>{
  const getReports = await Report.find();
  return NextResponse.json({message:getReports})
}