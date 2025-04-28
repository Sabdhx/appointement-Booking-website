import Appointment from "@/models/appointement"
import { NextResponse } from "next/server";

export const GET=async(request:Request)=>{
  const {searchParams} = new URL(request.url);
  const _id = searchParams.get("id")?.toString()
  console.log(_id)
 const fetchingAppointments = await Appointment.find({providerId:_id});
 console.log(fetchingAppointments)
 
 return NextResponse.json({message:"this Appointement is fetched",fetchingAppointments})
}