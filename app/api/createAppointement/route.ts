import { NextResponse } from "next/server"
import Appointment from "@/models/appointement";
export const POST=async(request:Request)=> {
  const formData = await request.formData()
  const clientId = formData.get("clientId")
  const providerId = formData.get("providerId")
  const postId = formData.get("postId")
  const date = formData.get("date")
  const time = formData.get("time")
  const username = formData.get("username")
  const email = formData.get("email")
  const description = formData.get("description")

  console.log(email)
  try {
    const newAppointement = await Appointment.create({clientId, providerId,postId,date,time,description,username})
    if(!newAppointement){
        return NextResponse.json({message:"make sure u've entered the right information"})
    }
    return NextResponse.json({message:"appointement created successfully",newAppointement})
  } catch (error:any) {
     return NextResponse.json({message:error.message})
  }
}