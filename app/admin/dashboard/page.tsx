"use client";
import { AllUsers } from "@/action/user";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useEffect, useState } from "react";
// import { ChartContainer ,ChartTooltip,ChartTooltipContent} from '@/components/ui/chart'
import { Bar, BarChart } from "recharts";

type user = {
  email:string;
  image:string;
  posts:[];
  username:string;
  _id:string
}
type ChartConfig = {
  title: string;
  data: any[];
  style?: Record<string, any>;
};
function Dashboard({}: Props) {
  const data = [
    { name: "Haircut", value: 10 },
    { name: "Massage", value: 15 },
    { name: "Consultation", value: 13 },
    { name: "Therapy", value: 18 },
    { name: "Haircut", value: 5 },
    { name: "Massage", value: 10 },
    { name: "Consultation", value: 19 },
    { name: "Therapy", value: 12 },
  ];
  const config: ChartConfig = {
    title: "Sales Chart",
    data: [],
    style: {},
  };
 const [Users, setUser] = useState()
  useEffect(()=>{
    const gettingAllUsers=async()=>{
      const response = await AllUsers()
      console.log(response)
      setUser(response)
    }
    gettingAllUsers()
  },[])





  return (
    <>
     <div className=" shadow-md rounded-lg p-6 mb-8  my-6 ">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 ">Welcome👋 {data?.user?.name}</h1>
            <p className="text-gray-600">Email {data?.user?.email}</p>
          </div>
          <div className="flex justify-center gap-[20vw] mx-[6vw] bg-gray-300">
            <div>
           <h1 className="text-5xl font-medium my-5">Data chart </h1>
      <ChartContainer config={config} style={{ width: 500, height: 400 }}>
        <BarChart data={data || []}>
          {/* <Bar  />   */}
          <Bar dataKey="value" fill="var(--chart-3)" radius={4} />

          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer>
      </div>
      <div className="">
        <h1 className="text-5xl font-medium py-[2vh] ">User's List</h1>
        {
        
          Users?.map((item:user)=>{
            return(
              <>
              <div key={item._id} className="bg-gray-400 w-[20vw]">
              <h1>{item.username}</h1>
              <h1>{item.email}</h1>
              <h1>{item.role}</h1>
              </div>
              </>
            )
          })
        }
      </div>
      </div>
    </>
  );
}

export default Dashboard;
