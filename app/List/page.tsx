"use client";
import { getAllPost } from "@/action/user";
import Post from "./post/Post";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    
      const filteringData = async () => {
        const response = await getAllPost(title);
        setData(response);
      };
      filteringData();
    
  }, [title]);
  console.log(title)
 
  return (
    <div className="grid grid-cols-3 my-6">
      {data.length > 0 ? (
        data.map((item, index) => (
          <Post
            key={index}
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
        ))
      ) : (
        <p className="col-span-3 text-center text-gray-500">Loading</p>
      )}
    </div>
  );
}
