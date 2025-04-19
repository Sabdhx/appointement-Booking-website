// app/api/postCreation/route.ts
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false, // This is crucial for file uploads
  },
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log("Form data received. Keys:", [...formData.keys()]);
    const images = formData.getAll("images");
    console.log("Number of images received:", images.length);
    return NextResponse.json({ 
      received: true,
      keys: [...formData.keys()],
      imageCount: images.length 
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({received: false, error: "Failed to process request"},{status: 500})}}