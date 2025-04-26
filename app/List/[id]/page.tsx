"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Image from "next/image";

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
  const [data, setData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchingUser = async () => {
      const response = await fetch(`/api/singlePost?id=${id}`);
      const result = await response.json();
      setData(result.post);
    };
    fetchingUser();
  }, [id]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center ">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image */}
        <div className="w-full h-60 relative">
          <Image
            src={data.images[0]}
            alt="Post Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>

          {/* Description */}
          <p className="text-gray-700 text-sm">{data.description}</p>

          {/* Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-gray-200 py-2">
              <span className="text-gray-600">Business Type:</span>
              <span className="text-gray-900 font-medium">{data.businessType}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-2">
              <span className="text-gray-600">Service Type:</span>
              <span className="text-gray-900 font-medium">{data.serviceType}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-2">
              <span className="text-gray-600">Duration:</span>
              <span className="text-gray-900 font-medium">{data.duration}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-2">
              <span className="text-gray-600">Price:</span>
              <span className="text-gray-900 font-medium">${data.price}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 py-2">
              <span className="text-gray-600">Payment Status:</span>
              <span className={`font-medium ${data.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}`}>
                {data.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-600">Booking Date:</span>
              <span className="text-gray-900 font-medium">
                {new Date(data.bookingData).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
