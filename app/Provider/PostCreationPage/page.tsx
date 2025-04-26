"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { z } from "zod";
import Loading from "./loading";

type Props = {};

function PostCreation({}: Props) {
  const [values,setValues] = useState<File[]>([])
  const {data} = useSession()
  const providerId = data?.user?.id

  if(!providerId){
    <Loading/>
  }

  console.log(providerId)
  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    const Data = e.currentTarget;
    const formData = new FormData(Data);
    values.forEach((file) => {
      formData.append("images", file);
      formData.append("providerId", providerId);
    });
    console.log(formData.get("images"))
    
    try {
      const res  = await fetch("/api/postCreation",{
        method:"POST",
        body:formData
       })
      //  const result =await res.json()
       console.log("result")
    } catch (error) {
      console.log(error.message)
    }
    
  };
    
  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create a New Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="description"
            type="text"
            placeholder="Description"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="businessType"
            type="text"
            placeholder="Business Type"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="duration"
            type="text"
            placeholder="Duration"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="price"
            type="text"
            placeholder="Price"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="address"
            type="text"
            placeholder="Address"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="latitude"
            type="text"
            placeholder="Latitude"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="longitude"
            type="text"
            placeholder="Longitude"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="paymentStatus"
            type="text"
            placeholder="Payment Status"
            className="w-full p-3 border rounded-md"
          />
          <Input
            name="serviceType"
            type="text"
            placeholder="Service Type"
            className="w-full p-3 border rounded-md"
          />
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files && files.length > 0) {
                const fileArray = Array.from(files);
                console.log(fileArray)
                setValues(fileArray); // This sets the array of File objects
              }
             
            }}
            // {!files && (
            //   <p className="text-red-500">theres is an error</p>
            // )}
          />
         
          <Button
            type="submit"
            className="w-full p-3 text-white rounded-md mt-4"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostCreation;
