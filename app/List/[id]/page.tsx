"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import AppointmentForm from "../form/page";
import ReportComponent from "@/app/normalUser/form/page";

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
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isReport,setIsReport] = useState<boolean>(false)
  const clientId = data?.user?.id;
  useEffect(() => {
    const fetchingUser = async () => {
      const response = await fetch(`/api/singlePost?id=${id}`);
      const result = await response.json();
      setData(result.post);
    };
    fetchingUser();
  }, [id]);

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
    setIsReport(false)
  };


   const handleReport = () => {
    setIsOpen(false);
    setIsReport(!isReport)
  };

  if (!Data) {
    return <Loading />;
  }
  console.log(Data.providerId);
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
            <span className="text-gray-900 font-semibold">
              {Data.businessType}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-600">Service Type:</span>
            <span className="text-gray-900 font-semibold">
              {Data.serviceType}
            </span>
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
            <span
              className={`font-semibold ${
                Data.paymentStatus === "paid"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {Data.paymentStatus}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Date:</span>
            <span className="text-gray-900 font-semibold">
              {new Date(Data.bookingData).toLocaleDateString()}
            </span>
          </div>
          {data?.user?.role !== "provider" && (
            <>
              <div>
                <Button className="w-[200px] mx-6" onClick={handleIsOpen}>
                  Book an Appointment
                </Button>
                <Button className="w-[200px]" onClick={handleReport}>
                  Report User
                </Button>
              </div>
            </>
          )}
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen
              ? "max-h-[1000px] opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
        >
          {isOpen && !isReport && (
            <AppointmentForm clientId={clientId} providerId={Data.providerId} />
          )}
            
        </div>
        <div>
          {isReport && !isOpen && (
            <ReportComponent  clientId={clientId} providerId={Data.providerId}/>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default Page;
