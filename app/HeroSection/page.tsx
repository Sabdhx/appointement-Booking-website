"use client"
import { useSession } from "next-auth/react";
import FormComponent from "./formComponent/FormComponent";

function page() {
  const session = useSession()
  async function handleSubmit(formData: FormData) {
 
    const input = formData.get("Input");
    console.log("Server received input:", input);
  }
    console.log(session)
  return (
    <div className="text-center">
      <div className="mt-[30vh]">
        <h1 className="text-[50px] font-bold">
          Universal Appointment Booking System
        </h1>
        <FormComponent submitting={handleSubmit} />
      </div>
    </div>
  );
}

export default page;
