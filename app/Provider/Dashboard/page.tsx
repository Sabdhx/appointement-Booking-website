"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import Post from "@/app/List/post/Post";
import { Button } from "@/components/ui/button";
import ListOfAppointement from "@/app/AppointementList/page";
type AppointmentProps = {
  _id: string;
  date: string;
  time: string;
  status: "pending" | "cancelled" | "confirmed" | "booked";
  description: string;
  username: string;
  email: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  providerId?: string; // ✅ string or undefined
  clientId: string;
};

function Dashboard() {
  const { data } = useSession();
  const [user, setUser] = useState<null | any>(null);
  const id = data?.user?.id;
  const [appointements, setAppointements] = useState<any[]>([]);
  const [isOpen,setIsOpen] = useState(false)

  useEffect(() => {
    if (!id) return;
    const fetchingAppointents = async () => {
      try {
        const response = await fetch(`/api/singleUser?id=${id}`);
        const fetching = await fetch(
          `/api/Appointements/fetchAppointements?id=${id}`
        );
        const UsersPostInfo = await response.json();
        const Appointements = await fetching.json();

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
  console.log("appointements",appointements?.fetchingAppointments);
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* User Info Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome👋 {data?.user?.name}
            </h1>
            <p className="text-gray-600">Email {data?.user?.email}</p>
          </div>

          {/* Posts Section */}
          <div className="flex gap-10">
            {/* Left Side: Posts */}
            <div className="w-[40%] grid grid-cols-1 ">
              {user?.posts.map((item: any, index: number) => (
                <>
                  <div key={index}>
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
                  </div>
                </>
              ))}
            </div>
            <div className="flex-1/3  p-4 rounded-lg">
              {/* Right Side: Extra Content */}
              {appointements?.fetchingAppointments.map(
                (item: AppointmentProps, index: number) => {
                  return (
                    <>
                      <div key={index}>
                        <ListOfAppointement
                          _id={item._id}
                          date={item.date}
                          time={item.time}
                          status={item.status}
                          description={item.description}
                          username={item.username}
                          email={item.email}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          providerId = {item.providerId}
                          clientId= {item.clientId}
                          
                        />
                      </div>
                    </>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
