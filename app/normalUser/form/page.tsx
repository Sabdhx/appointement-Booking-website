"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  clientId: string;
  providerId: string;
};

function ReportComponent({ clientId, providerId }: Props) {
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
    } else {
      formData.append("reporttype", "appointment");
      formData.append("reporterId", clientId);
      formData.append("reportedUserId", providerId);
    }

    try {
      const response = await fetch("/api/Reporting", {
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
          className="w-[50vw] mb-4"
          required
        />
        <Input
          name="message"
          placeholder="Enter a detailed message"
          className="w-[50vw] mb-4"
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default ReportComponent;
