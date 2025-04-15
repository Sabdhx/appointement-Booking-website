"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
export default function FormComponent({ submitting}: { submitting:(formData: FormData) => void;
}) {
  const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault();
     const formData = new FormData(e.currentTarget);
     submitting(formData)
    }
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="Input" 
        className="w-[500px] inline mx-3"
        placeholder="Enter your name"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
