"use client"
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker, { DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker"; // ✅ Add this import
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
type Props = {
  providerId:String
  clientId:String
}
function AppointmentForm({providerId,clientId}: Props) {
  const {id} = useParams()
  const postId = id
  const [message,setMessage] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeValue, setTimeValue] = useState<DateObject | null>();

  const handleForm =async (e: React.FormEvent<HTMLElement>) => {
   e.preventDefault();
   const Data = e.currentTarget  as HTMLFormElement
   const formData = new FormData(Data)
    if(date || postId || providerId || clientId){
     formData.append("date", date?.toDateString())
     formData.append("postId", postId)
     formData.append("providerId", providerId)
     formData.append("clientId", clientId)
     formData.append("time", timeValue.format?.("hh:mm A"))
    }
    const formEnteries = Object.fromEntries(formData.entries())
    console.log(formEnteries)
    try {
    const response = await fetch("/api/Appointements/createAppointement",{
      method:"POST",
      body:formData
     })
     const result =await response.json()
     setMessage(result.message)
    } catch (error) {
      console.log(error.message)
    }
   
   
  };
  console.log(message)
  const handleDateChange = (newDateTime:any)=>{  
    setTimeValue(newDateTime)
    console.log(newDateTime.format?.("hh:mm A"))
  }
//  console.log()
  return (
    <form onSubmit={handleForm}>
      <div className="flex justify-center">
        <div className="w-full max-w-lg p-4">
          <Input placeholder="Enter Full Name" type="text" name="username" />
          <Input placeholder="Enter Email" type="email" name="email" className="mt-2" />
          <div className="flex justify-between gap-4 mt-4">
            <div className="w-full">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <div className="w-full max-w-xs">
              <DatePicker
                disableDayPicker
                value={timeValue}
                format="hh:mm A"
                onChange={handleDateChange}
                plugins={[<TimePicker position="bottom" />]}
              />
            </div>
          </div>
          <Textarea name="description" rows={3} className="mt-4" placeholder="Description" />
          <Button type="submit" className="my-4">Submit</Button>
        </div>
      </div>
     <div className="flex justify-center">
      <div>
        
       <p className="">{message}</p> </div>
     </div>
    </form>
  );
}
export default AppointmentForm;