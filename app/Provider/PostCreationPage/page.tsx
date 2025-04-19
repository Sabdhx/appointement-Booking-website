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
import { useEffect } from "react";

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
  // images: z.array(z.string()).min(1, { message: "At least one image is required" }),
});

export type PostFormData = z.infer<typeof postSchema>;

export default function PostCreationPage() {
  const { data } = useSession();
  const providerId = data?.user?.id;

  const {
    register,
    handleSubmit,
    reset,
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
    const wholeData = {
      ...data,
      providerId,
      location: {
        address: data.address,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
      },
    };
  
    const res = await fetch('/api/postCreation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wholeData),
    });
    const result = await res.json();
    console.log(result);
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

      {/* Placeholder image input */}
      {/* <Input
        placeholder="Image URL"
        onChange={(e) =>
          setValue("images", [e.target.value]) // simple single URL input
        }
      />
      {errors.images && (
        <p className="text-red-500">{errors.images.message}</p>
      )} */}

      <Button type="submit">Submit</Button>
    </form>
  );
}
