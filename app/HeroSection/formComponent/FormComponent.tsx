"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FormComponent({ handleSubmit}: { handleSubmit:(formData: FormData) => void;
}) {
  return (
    <form action={handleSubmit}>
      <Input
        name="Input" 
        className="w-[500px] inline mx-3"
        placeholder="Enter your name"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
