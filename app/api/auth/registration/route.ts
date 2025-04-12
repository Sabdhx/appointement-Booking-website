import { DBConnect } from "@/app/lib/DB";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { routeModule } from "next/dist/build/templates/pages";

export async function POST(req: Request) {
  try {
    const { username, email, password ,role} = await req.json();
     console.log("role",role)

     if (!username || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    await DBConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      role,
      username,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      { 
        message: "User registered successfully",
        user: userWithoutPassword 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}