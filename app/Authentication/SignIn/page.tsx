"use client"
import React from 'react'
import Form from './form/page';
function SignIn() {
  const handleSubmit=async(formData:FormData)=>{
   const input = formData.get("username")
   const password = formData.get("password")
   console.log(input,password)
   const body = {
    username:input,
    password:password
   };
   
  }
      return (
        <div className="">
         <Form submitting={handleSubmit}/>
        </div>
      );
    }
export default SignIn