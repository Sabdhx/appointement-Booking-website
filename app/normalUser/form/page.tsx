"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  clientId: string;
  providerId: string;
  postId:string
  appointmentId:string
};

function ReportComponent({ clientId, providerId,postId ,appointmentId}: Props) {
  const { data } = useSession();

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Add reporter and reported IDs based on role
    if (data?.user?.role === "provider") {
      formData.append("reporttype", "profile");
      formData.append("reporterId", providerId);
      formData.append("reportedUserId", clientId);
            formData.append("appointmentId",appointmentId)

    } else {
      formData.append("reporttype", "post");
      formData.append("reporterId", clientId);
      formData.append("reportedUserId", providerId);
      formData.append("postId",postId)
    }

    try {
      const response = await fetch("/api/create/Reports", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Report Submitted:", result);
        alert("Report submitted successfully.");
        form.reset();
      } else {
        console.error("Error submitting report:", result);
        alert(result.message || "Failed to submit report.");
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("Something went wrong while submitting the report.");
    }
  };

  return (
    <div className="m-[5vh]">
      <form onSubmit={handleFormSubmission} method="POST">
        <Input
          name="reason"
          placeholder="Enter the reason for report"
          className="w-[30vw] mb-4"
          required
        />
        <Input
          name="message"
          placeholder="Enter a detailed message"
          className="w-[30vw] mb-4"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default ReportComponent;
