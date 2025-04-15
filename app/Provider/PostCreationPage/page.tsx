"use client";

import { useForm } from "react-hook-form";
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
import { postCreation } from "@/action/user";
import { useSession } from "next-auth/react";
import Loading from "./loading";

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
  serviceTypt: z
    .enum(["Online", "Phone call", "In-person"])
    .default("In-person"),
  customerFeedback: z
    .enum(["Great service!", "Normal Service", "Poor Service"])
    .optional(),
    providerId: z.string(),

  images: z.array(z.string())
    .min(1, { message: "Atleast one image is required" }),
});

export type PostFormData = z.infer<typeof postSchema>;

export default function PostCreationPage() {
  const { data } = useSession();
  const providerId = data?.user?.id

  if (!providerId) {
    <Loading />;
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = (data: PostFormData) => {
    const postData = {
      ...data,
      providerId:providerId,
    };
    console.log("postData",postData)
    postCreation(postData);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl mx-auto mt-10"
    >
      <Input placeholder="Title" {...register("title")} />
      <Textarea placeholder="Description" {...register("description")} />
      <Input placeholder="Business Type" {...register("businessType")} />
      <Input placeholder="Duration" {...register("duration")} />
      <Input placeholder="Price" {...register("price")} />
      <Input placeholder="Address" {...register("address")} />
      <Input placeholder="Latitude" {...register("latitude")} />
      <Input placeholder="Longitude" {...register("longitude")} />

      <Select {...register("paymentStatus")}>
        <SelectTrigger>
          <SelectValue placeholder="Payment Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paid">Paid</SelectItem>
          <SelectItem value="unpaid">Unpaid</SelectItem>
        </SelectContent>
      </Select>

      <Select {...register("status")}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>

      <Select {...register("serviceTypt")}>
        <SelectTrigger>
          <SelectValue placeholder="Service Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Online">Online</SelectItem>
          <SelectItem value="Phone call">Phone Call</SelectItem>
          <SelectItem value="In-person">In-person</SelectItem>
        </SelectContent>
      </Select>

      <Select {...register("customerFeedback")}>
        <SelectTrigger>
          <SelectValue placeholder="Customer Feedback" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Great service!">Great service!</SelectItem>
          <SelectItem value="Normal Service">Normal Service</SelectItem>
          <SelectItem value="Poor Service">Poor Service</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit">Submit</Button>
    </form>
  );
}
