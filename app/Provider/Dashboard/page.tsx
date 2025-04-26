"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import Loading from './loading';
import Post from '@/app/List/post/Post';
import { Button } from '@/components/ui/button';

function Dashboard() {
  const { data } = useSession();
  const [user, setUser] = useState<null | any>(null);
  const id = data?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const fetching = await fetch(`/api/singleUser?id=${id}`);
      const result = await fetching.json();
      setUser(result);
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* User Info Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.user.username} 👋</h1>
          <p className="text-gray-600">Email: {user.user.email}</p>
        </div>

        {/* Posts Section */}
        <div className="flex justify-between">
          <h2 className=" flex-1/2 text-2xl font-semibold text-gray-800 mb-4">My Posts 📋</h2>
          <div className="grid gap-6 grid-cols-2 ">
            {user.user.posts.map((item: any, index: number) => (
              <div
                key={index}
                className="   transition duration-300"
              >
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
                />
                
      
    
              </div>
            ))}
          </div>
          <div className='bg-gray-300 flex-1/2 '>
         <h1> hey man </h1> 
          
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default Dashboard;
