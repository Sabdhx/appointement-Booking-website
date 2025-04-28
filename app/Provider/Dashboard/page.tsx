"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import Post from "@/app/List/post/Post";
import { Button } from "@/components/ui/button";
import ListOfAppointement from "@/app/AppointementList/page";

function Dashboard() {
  const { data } = useSession();
  const [user, setUser] = useState<null | any>(null);
  const id = data?.user?.id;
  const [appointements, setAppointements] = useState<any[]>([]);
  useEffect(() => {
    if (!id) return;

    const fetchingAppointents = async () => {
      try {
        const response = await fetch(`/api/singleUser?id=${id}`);
        const fetching = await fetch(
          `/api/fetchAppointements?id=60d9f9b2f1f5b1d2e8c5f5b8`
        );
        const UsersPostInfo = await response.json();
        const Appointements = await fetching.json();
        // console.log("UsersPostInfo", UsersPostInfo);
        // console.log("Appointements", Appointements);
        setUser(UsersPostInfo.user);
        setAppointements(Appointements);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchingAppointents();
  }, [id]);

  if (typeof window === "undefined" || !user) {
    return <Loading />; // Consistent SSR + Client
  }
   console.log(appointements?.fetchingAppointments)
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* User Info Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome👋</h1>
            <p className="text-gray-600">Email</p>
          </div>

          {/* Posts Section */}
          <div className="flex gap-10">
            {/* Left Side: Posts */}
            <div className="w-[40%] grid grid-cols-1 ">
              {user?.posts.map((item: any, index: number) => (
                <>
                  <Post
                    title={item.title}
                    description={item.description}
                    businessType={item.businessType}
                    duration={item.duration}
                    price={item.price}
                    paymentStatus={item.paymentStatus}
                    serviceType={item.serviceType}
                    images={item.images}
                    bookingData={item.bookingData}
                    providerId={item.providerId}
                    id={id}
                    _id={item._id}
                  />
                </>
              ))}
            </div>
            <div className="flex-1/3  p-4 rounded-lg">
            {/* Right Side: Extra Content */}
            {appointements?.fetchingAppointments.map((item: any, index: number) => {
              return (
                <>
                  <ListOfAppointement key={index}  service={item.service} date={item.date} time={item.time} status={item.status}  />
                </>
              );
            })}
                        </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
