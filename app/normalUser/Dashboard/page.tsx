"use client";
import ListOfAppointement from '@/app/AppointementList/page';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type Props = {}
 type Appointement ={
               clientId:string;
               providerId:string;
               username:string;
               email:string;
               createdAt:string;
               date:string;
               description:String;
               postId:string;
               status:string;
               time:string;
               _id:string;
             }
function Dashboard({}: Props) {
  const {data} = useSession() 
  const clientId = data?.user?.id
  const [appointements,setAppointements] = useState([])
  console.log(clientId)

  useEffect(() => {
      if (!clientId) return;
  
      const fetchingAppointents = async () => {
        try {
          const fetching = await fetch(
            `/api/Appointements/fetchClientIdBasedAppointement?id=${clientId}`
          );
          const Appointements = await fetching.json();
            console.log("Appointements",Appointements.fetchingAppointments)
          setAppointements(Appointements);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchingAppointents();
    }, [clientId]);
    console.log("Appointements",appointements.fetchingAppointments)
  return (
    <div>
       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome👋 {data?.user?.name}</h1>
            <p className="text-gray-600">Email {data?.user?.email}</p>
          </div>

      <div className='flex justify-between mx-[10vw]'>
        <div className='bg-gray-500'>d</div>
        <div className='my-[5vh]'>
          <p className='my-4 text-4xl font-medium'>List of Appointements</p>
        {
              appointements?.fetchingAppointments?.map((item:Appointement)=>{
                      return(
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
                      )
              })
               
            }
        </div>
      </div>
      
      
    </div>
  )
}

export default Dashboard