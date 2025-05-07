"use client";

import { AllUsers } from "@/action/user";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useEffect, useState } from "react";
import { Bar, BarChart } from "recharts";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type User = {
  email: string;
  image: string;
  posts: [];
  username: string;
  _id: string;
  role: string;
};

type ChartConfig = {
  title: string;
  data: any[];
  style?: Record<string, any>;
};

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

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
    data: data,
    style: {},
  };

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await AllUsers();
      setUsers(response || []);
    };
    fetchUsers();
  }, []);

  // Delete user function
  const handleDeleteUser = async (id: string) => {
    const res = await fetch(`/api/Users/deleteUser?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setUsers(prev => prev.filter(user => user._id !== id));
    } else {
      console.error("Failed to delete user");
    }
  };

  return (
    <>
      <div className="shadow-md rounded-lg p-6 mb-8 my-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome👋 Admin
        </h1>
        <p className="text-gray-600">Dashboard Overview</p>
      </div>

      <div className="flex justify-center gap-[20vw] mx-[6vw] bg-gray-300">
        {/* Chart Section */}
        <div>
          <h1 className="text-5xl font-medium my-5">Data Chart</h1>
          <ChartContainer config={config} style={{ width: 500, height: 400 }}>
            <BarChart data={data}>
              <Bar dataKey="value" fill="var(--chart-3)" radius={4} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ChartContainer>
        </div>

        {/* User List Section */}
        <div>
          <h1 className="text-5xl font-medium py-[2vh]">User's List</h1>
          {users.map((item) => (
            <div
              key={item._id}
              className="bg-gray-100 rounded-2xl shadow-md p-6 w-[300px] flex flex-col gap-2 my-5"
            >
              <div className="text-lg font-semibold text-gray-800">
                {item.username}
              </div>
              <div className="text-sm text-gray-600">{item.email}</div>
              <div className="text-sm text-gray-500 italic">{item.role}</div>

              <Button
                className="mt-4 w-full flex gap-2 items-center justify-center bg-red-400"
                onClick={() => handleDeleteUser(item._id)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
