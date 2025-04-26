import { NextResponse } from "next/server"
import Appointment from "@/models/appointement";
export const POST=async(request:Request)=> {
  const {clientId, providerId,service,date,time,status} =await request.json();
  console.log(clientId)
  try {
    const newAppointement = await Appointment.create({
      clientId, providerId,service,date,time,status
    })
    if(!newAppointement){
        return NextResponse.json({message:"make sure u've entered the right information"})
    }
    return NextResponse.json({message:"appointement created successfully",newAppointement})
  } catch (error:any) {
     return NextResponse.json({message:error.message})
  }
}