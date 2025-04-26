import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import cloudinary from '@/app/cloudinary/Cloudinary'; // make sure this is correctly configured
import Post from '@/models/post';
import { DBConnect } from '@/app/lib/DB';
import User from '@/models/user';

export const config = {
  api: {
    bodyParser: false,
  },
};


export async function POST(request: Request,response: NextResponse) {
 
 
  try {
    const formData = await request.formData();
    const title =  formData.get("title")
    const description =  formData.get("description")
    const businessType =  formData.get("businessType")
    const duration =  formData.get("duration")
    const price =  formData.get("price")
    const address =  formData.get("address")?.toString()
    const latitude =  formData.get("latitude")
    const longitude =  formData.get("longitude")
    const paymentStatus =  formData.get("paymentStatus")
    const status =  formData.get("status")
    const serviceType =  formData.get("serviceType")
    const providerId =  formData.get("providerId")
    const files = formData.getAll('images') as File[];
    DBConnect()
    const findingUser = await User.findOne({_id:providerId})
    console.log(findingUser.role)
   
   if(findingUser.role !== "provider") return NextResponse.json({message:"this user is not a provider"})

    if (!files || files.length === 0) {
      return NextResponse.json({ message: 'No files uploaded' }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedResults = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.name);
        const filename = 'image-' + uniqueSuffix + ext;
        const localPath = path.join(uploadDir, filename);

        await fs.writeFile(localPath, buffer);

        const uploadResult = await cloudinary.uploader.upload(localPath, {
          filename_override: filename,
          folder: 'postImages',
        });
        await fs.unlink(localPath);
        return uploadResult;
      })
    );

    console.log(uploadedResults.map((item)=>{
      return item.url
    }))

    const imageUpload = {
      images: uploadedResults.map(item => item.url),
    }
    console.log(imageUpload.images)
    const postData = {
        providerId:providerId,
        title:title,
        description:description,
        businessType: businessType,
        duration: duration,
        price: price,
        location: {
          address: address,
          latitude: latitude,
          longitude: longitude,
        },
        paymentStatus: paymentStatus,
        status: status,
        serviceType: serviceType,
        images:imageUpload.images
      }
    const postUpload = await Post.create(postData)
    findingUser.posts.push(postUpload);
    await findingUser.save();      
    
    return NextResponse.json({ message: 'Data received successfully', postUpload});
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: error.message || 'Error uploading files' },
      { status: 500 }
    );
  }
} 