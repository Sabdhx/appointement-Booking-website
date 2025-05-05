import { NextResponse } from "next/server"
import Appointment from "@/models/appointement";
import Post from "@/models/post";
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

  
  try {
    const filter = clientId ? { customer: { $in: [clientId] } } : {};
    const allPosts = await Post.find(filter);
    if(allPosts){
      return NextResponse.json({message:"post can be booked by only one time"})
    }
    const newAppointement = await Appointment.create({username,clientId, providerId,postId,date,time,description,email})
    const idInPostSchema = await Post.findOne({_id:postId});
    console.log(idInPostSchema.customer.push(clientId))
    console.log(idInPostSchema)
   await idInPostSchema.save()
    console.log(idInPostSchema)
    if(!newAppointement){
        return NextResponse.json({message:"make sure u've entered the right information"})
    }
    return NextResponse.json({message:"appointement created successfully",newAppointement})
  } catch (error:any) {
     return NextResponse.json({message:error.message})
  }
}