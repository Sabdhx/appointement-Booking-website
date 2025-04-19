"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { z } from "zod";
import { useSession } from "next-auth/react";
import Loading from "./loading";
import { ChangeEvent, useEffect } from "react";

const postSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  businessType: z.string().min(1),
  duration: z.string(),
  price: z.string(),
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  paymentStatus: z.enum(["paid", "unpaid"]).default("unpaid"),
  status: z.enum(["Pending", "Completed", "Canceled"]).default("Pending"),
  serviceType: z.enum(["Online", "Phone call", "In-person"]).default("In-person"),
  customerFeedback: z
    .enum(["Great service!", "Normal Service", "Poor Service"])
    .optional(),
    images: z.array(z.instanceof(File)).min(1, { message: "At least one image is required" })
  });

export type PostFormData = z.infer<typeof postSchema>;

export default function PostCreationPage() {
  const { data } = useSession();
  const providerId = data?.user?.id;

 

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      businessType: "",
      duration: "",
      price: "",
      address: "",
      latitude: "",
      longitude: "",
      paymentStatus: "unpaid",
      status: "Pending",
      serviceType: "In-person",
      customerFeedback: undefined,
      images: [],
    },
  });

 
  if (!providerId) {
    return <Loading />;
  }

  const onSubmit = async (data: PostFormData) => {
    try {
      // Create FormData object
      const formData = new FormData();
  
      // Append all non-file fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('businessType', data.businessType);
      formData.append('duration', data.duration);
      formData.append('price', data.price);
      formData.append('address', data.address);
      formData.append('latitude', data.latitude);
      formData.append('longitude', data.longitude);
      formData.append('paymentStatus', data.paymentStatus);
      formData.append('status', data.status);
      formData.append('serviceType', data.serviceType);
      if (data.customerFeedback) {
        formData.append('customerFeedback', data.customerFeedback);
      }
      formData.append('providerId', providerId);
  
      // Append location as JSON string
      formData.append('location', JSON.stringify({
        address: data.address,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
      }));
  
      // Append each image file
      data.images.forEach((file, index) => {
        formData.append(`images`, file);
      });
  
      const res = await fetch('/api/postCreation', {
        method: 'POST',
        body: formData, // No Content-Type header needed, browser will set it automatically with boundary
      });
  
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto mt-10"
    >
      <Input placeholder="Title" {...register("title")} />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}

      <Textarea placeholder="Description" {...register("description")} />
      {errors.description && (
        <p className="text-red-500">{errors.description.message}</p>
      )}

      <Input placeholder="Business Type" {...register("businessType")} />
      <Input placeholder="Duration" {...register("duration")} />
      <Input placeholder="Price" {...register("price")} />
      <Input placeholder="Address" {...register("address")} />
      <Input placeholder="Latitude" {...register("latitude")} />
      <Input placeholder="Longitude" {...register("longitude")} />

      <Controller
        control={control}
        name="paymentStatus"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        control={control}
        name="serviceType"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Phone call">Phone Call</SelectItem>
              <SelectItem value="In-person">In-person</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

      <Controller
        control={control}
        name="customerFeedback"
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Customer Feedback" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Great service!">Great service!</SelectItem>
              <SelectItem value="Normal Service">Normal Service</SelectItem>
              <SelectItem value="Poor Service">Poor Service</SelectItem>
            </SelectContent>
          </Select>
        )}
      />

<Input
  type="file"
  multiple
  accept="image/*"
  onChange={(e:ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setValue("images", fileArray); // This sets the array of File objects
    }
  }}
/>
{errors.images && (
  <p className="text-red-500">{errors.images.message}</p>
)}


      <Button type="submit">Submit</Button>
    </form>
  );
}
