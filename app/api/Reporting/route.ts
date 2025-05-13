import { DBConnect } from "@/app/lib/DB";
import Post from "@/models/post";
import Report from "@/models/reports";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const formData = await request.formData();
  const postId = formData.get("postId")?.toString();
  const appointmentId = formData.get("appointmentId")?.toString();
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

    if (reporttype === "post") {
      if (!postId) {
        return NextResponse.json(
          { message: "not getting the post id try again" },
          { status: 400 }
        );
      }

      const findPost = await Report.findOne({ postId, reporterId });
      console.log("Found existing post report:", findPost);

      if (findPost) {
        return NextResponse.json(
          { message: "Can't send a report more than one time." },
          { status: 400 }
        );
      }

      const creatingReport = await Report.create({
        reporterId,
        reportedUserId,
        reporttype,
        reason,
        message,
        postId,
      });

      return NextResponse.json(
        {
          message: "Report has been created successfully.",
          report: creatingReport,
        },
        { status: 201 }
      );
    } 
    
    else if (reporttype === "profile") {
      if (!appointmentId) {
        return NextResponse.json(
          { message: "not getting the appointment id, try again" },
          { status: 400 }
        );
      }

      const findProfileReport = await Report.findOne({ appointmentId, reporterId });
      if (findProfileReport) {
        return NextResponse.json(
          { message: "Can't make report more than once on a single appointment." },
          { status: 400 }
        );
      }

      const creatingReport = await Report.create({
        reporterId,
        reportedUserId,
        reporttype,
        reason,
        message,
        appointmentId,
      });

      return NextResponse.json(
        {
          message: "Report has been created successfully.",
          report: creatingReport,
        },
        { status: 201 }
      );
    } 
    
    else {
      return NextResponse.json(
        { message: "Invalid report type." },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json(
      { message: "Failed to create report.", error },
      { status: 500 }
    );
  }
};
