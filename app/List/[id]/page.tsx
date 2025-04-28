"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import AppointmentForm from "../form/page";

type Props = {};

type PostData = {
  _id: string;
  providerId: string;
  title: string;
  description: string;
  businessType: string;
  customer: [];
  duration: string;
  price: string;
  paymentStatus: string;
  serviceType: string;
  images: string[];
  bookingData: string;
  __v: number;
};

function Page({}: Props) {
  const { id } = useParams();
  const [Data, setData] = useState<PostData | null>(null);
  const {data} = useSession()
  const [isOpen,  setIsOpen] = useState<boolean>(false)

  const clientId = data?.user?.id;
  useEffect(() => {
    const fetchingUser = async () => {
      const response = await fetch(`/api/singlePost?id=${id}`);
      const result = await response.json();
      setData(result.post);
    };
    fetchingUser();
  }, [id]);
 
  const handleIsOpen=()=>{
   
      setIsOpen(!isOpen)
    
  }


  if (!Data) {
    return <Loading />;
  }
  console.log(Data.providerId)
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      {/* Full Width Carousel */}
      <div className="w-screen h-[400px] relative">
        <Carousel>
          <CarouselContent>
            {Data.images.map((item) => (
              <CarouselItem key={item}>
                <div className="w-screen h-[400px] relative">
                  <Image
                    src={item}
                    alt="Post Image"
                    fill
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Full Width Content */}
      <div className="w-screen bg-white p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{Data.title}</h1>

        {/* Description */}
        <p className="text-gray-700 text-lg mb-8">{Data.description}</p>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Business Type:</span>
            <span className="text-gray-900 font-semibold">{Data.businessType}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Service Type:</span>
            <span className="text-gray-900 font-semibold">{Data.serviceType}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Duration:</span>
            <span className="text-gray-900 font-semibold">{Data.duration}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Price:</span>
            <span className="text-gray-900 font-semibold">${Data.price}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Payment Status:</span>
            <span className={`font-semibold ${Data.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>
              {Data.paymentStatus}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Date:</span>
            <span className="text-gray-900 font-semibold">
              {new Date(Data.bookingData).toLocaleDateString()}
            </span>
          </div>
          {
            data?.user?.role !== "provider" && <Button className="w-[200px]" onClick={handleIsOpen}>Book an Appointement</Button>
          }
        </div>
        {
          isOpen && <AppointmentForm clientId={clientId} providerId={Data.providerId} />
        }
      </div>
    </div>
  );
}

export default Page;
