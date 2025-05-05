import { NextResponse } from "next/server"
import Appointment from "@/models/appointement";

export const PUT=async(request:Request)=> {
  const { status, date, time,_id } = await request.json();
  console.log({
    date,time,status,_id
  })
  try {

    const newAppointement = await Appointment.findByIdAndUpdate(
      {_id},
      {status,date,time}
    )
    if(!newAppointement){
        return NextResponse.json({message:"make sure u've entered the right information"})
    }
    return NextResponse.json({message:"appointement updated successfully",newAppointement})
  } catch (error:any) {
     return NextResponse.json({message:error.message})
  }
}