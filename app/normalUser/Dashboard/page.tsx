"use client";
import { getUserAppointedPost } from "@/action/user";
import ListOfAppointement from "@/app/AppointementList/page";
import Post from "@/app/List/post/Post";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};
type Appointement = {
  clientId: string;
  providerId: string;
  username: string;
  email: string;
  createdAt: string;
  date: string;
  description: String;
  postId: string;
  status: string;
  time: string;
  _id: string;
};

function Dashboard({}: Props) {
  const { data } = useSession();
  const clientId = data?.user?.id;
  const [AppointedPosts, setAppointedPosts] = useState<null | any>(null);
  const [appointements, setAppointements] = useState<Appointement | []>([]);

  useEffect(() => {
    if (!clientId) return;

    const fetchingAppointents = async () => {
      try {
        const fetching = await fetch(
          `/api/Appointements/fetchClientIdBasedAppointement?id=${clientId}`
        );
        const Appointements = await fetching.json();
        setAppointements(Appointements);

        // Now safely extract providerIds and fetch posts

        if (clientId) {
          const response = await getUserAppointedPost(clientId);
          setAppointedPosts(response);
          console.log("Filtered Posts:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchingAppointents();
  }, [clientId]);

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome👋 {data?.user?.name}
        </h1>
        <p className="text-gray-600">Email {data?.user?.email}</p>
      </div>

      <div className="flex justify-between mx-[10vw]">
        <div className="">
          {AppointedPosts?.map((item: any, index: number) => (
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
                  _id={item._id}
                />
              </div>
            </>
          ))}
        </div>
        <div className="my-[5vh]">
          <p className="my-4 text-4xl font-medium">List of Appointements</p>
          {appointements?.fetchingAppointments?.map((item: any) => {
            return (
              <>
                <div key={item._id}>
                  <ListOfAppointement
                    _id={item._id}
                    date={item.date}
                    time={item.time}
                    status={item.status}
                    description={item.description}
                    username={item.username}
                    email={item.email}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
