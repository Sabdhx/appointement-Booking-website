"use client"
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Props = {
  key: number
  title: string
  description: string
  businessType: string
  duration: string
  price: string
  paymentStatus: string
  serviceType: string
  images: string[]
  bookingData: string
  providerId: string
  id:string
  _id:string
}

function Post({
  title,
  description,
  businessType,
  duration,
  price,
  paymentStatus,
  serviceType,
  images,
  bookingData,
  providerId,
  id,
  _id
}: Props) {

    const handleDelete=async()=>{
     const response = await fetch(`/api/deletePost?id=${id}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    console.log(result)
    }
   const router = useRouter();
   console.log(_id)
 

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-md overflow-hidden border mb-6 mx-[40px]" >
        <Image
      src={images[0]}
      width={500}
      height={500}
      alt="Picture of the author"
    />
      <div className="p-4 space-y-2" onClick={()=>router.push(`/List/${_id}`)}>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex flex-wrap gap-2 mt-2 text-xs">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{businessType}</span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{serviceType}</span>
          <span className={`px-2 py-1 rounded-full ${
            paymentStatus === "paid" ? "bg-green-200 text-green-900" : "bg-red-200 text-red-900"
          }`}>
            {paymentStatus}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-3 text-gray-700">
          <p>Duration: <span className="font-medium">{duration}</span></p>
          <p>Price: <span className="font-semibold">${price}</span></p>
        </div>
        <p className="text-xs text-gray-400 mt-1">Booking Date: {new Date(bookingData).toLocaleDateString()}</p>
      </div>
     {
      providerId === id &&
      <div className='flex justify-between'>
        <div></div>
        <div className='p-3'>
        <Button className='bg-red-400 ' onClick={handleDelete}>Delete</Button>
        </div>
      </div>

     }
    </div>
  )
}

export default Post
