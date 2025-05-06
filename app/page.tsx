"use client"
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import FormComponent from "./formComponent/FormComponent";

export default function Home() {
   const session = useSession()
    const router = useRouter();
    async function handleSubmit(formData: FormData) {
      const input = formData.get("Input"); 
      router.push(`/List?title=${encodeURIComponent(input)}`)
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

