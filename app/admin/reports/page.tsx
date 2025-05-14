"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type ReportType = {
  _id: string;
  createdAt: string;
  message: string;
  postId: string;
  reason: string;
  reportedUserId: string;
  reporterId: string;
  reporttype: string;
};

function Reports() {
  const [reports, setReports] = useState<ReportType[] | null>(null);
  const [message,setMessage] = useState<string | null>()
  const handleDelete=async(id:string)=>{
    console.log("first")
    const deletedData = await fetch(`/api/Reports/delete?id=${id}`,{
      method:"DELETE"
    });
    const result = await deletedData.json();
          alert(result.message)
    setMessage(result)
  }
  useEffect(() => {
    const getReports = async () => {
      const response = await fetch("/api/Reports/get");
      const result = await response.json();
      console.log(result);
      setReports(result.message);
    };
    getReports();
  }, []);

  return (
    <ScrollArea className="h-[600px] p-4">
      <div className="grid gap-4">
        {reports?.map((item) => (
          <Card
            key={item._id}
            className="bg-gray-100 shadow-sm border border-gray-300"
          >
            <CardHeader>
              <CardTitle className="text-md text-gray-700">
                Reported {item.reporttype === "post" ? "Post" : "User"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <div>
                  <p>
                    <span className="font-medium text-gray-800">Reason:</span>{" "}
                    {item.reason}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Message:</span>{" "}
                    {item.message}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Post ID:</span>{" "}
                    {item.postId}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Reported User:
                    </span>{" "}
                    {item.reportedUserId}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Reporter:</span>{" "}
                    {item.reporterId}
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">Created:</span>{" "}
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <Button className="bg-red-500" onClick={()=>handleDelete(item._id)}>Delete</Button>
                </div>
              </div>

              <Badge variant="outline">{item.reporttype}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}

export default Reports;
