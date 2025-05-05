
import Appointment from "@/models/appointement"
import { NextResponse } from "next/server";

export const GET=async(request:Request)=>{
  const {searchParams} = new URL(request.url);
  const _id = searchParams.get("id")?.toString()
  console.log(_id)
 const fetchingAppointments = await Appointment.find({clientId:_id});
 console.log(fetchingAppointments)
 
 return NextResponse.json({message:"this Appointement is fetched",fetchingAppointments})
}


  {/* {
              appointements?.fetchingAppointments?.map((item:Appointement)=>{
                      return(
                        <>
                        <div key={item._id}>
               <ListOfAppointement
               _id={item._id}
                 date={item.date}
                 time={item.time}
                 status={item.status}
                 description={item.description}
                 username={item.username}
                 email={item.email}
               />
             </div>
                        </>
                      )
              })
               
            } */}
            