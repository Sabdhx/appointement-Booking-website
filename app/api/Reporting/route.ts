import { DBConnect } from "@/app/lib/DB";
import Report from "@/models/reports";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const formData = await request.formData();

  const reporterId = formData.get("reporterId")?.toString();
  const reportedUserId = formData.get("reportedUserId")?.toString();
  const reporttype = formData.get("reporttype")?.toString();
  const reason = formData.get("reason")?.toString();
  const message = formData.get("message")?.toString();

  if (!reporterId || !reportedUserId || !reason || !message || !reporttype) {
    return NextResponse.json(
      { message: "Missing required fields." },
      { status: 400 }
    );
  }

  if (reporterId === reportedUserId) {
    return NextResponse.json(
      { message: "Reporter and reported user cannot be the same." },
      { status: 400 }
    );
  }

  try {
    await DBConnect();

    const creatingReport = await Report.create({
      reporterId,
      reportedUserId,
      reporttype,
      reason,
      message,
    });

    return NextResponse.json(
      { message: "Report has been created successfully.", report: creatingReport },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { message: "Failed to create report.", error },
      { status: 500 }
    );
  }
};
