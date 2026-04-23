import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, mobile, userType, message } = body;

    if (!email || !mobile || !message) {
      return NextResponse.json(
        { error: "Email, mobile number, and message are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const mobileRegex = /^[0-9]{10,15}$/;
    if (!mobileRegex.test(String(mobile).trim())) {
      return NextResponse.json(
        { error: "Please provide a valid mobile number" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const contactDoc = {
      name: name?.trim() || "",
      email: email.trim().toLowerCase(),
      mobile: String(mobile).trim(),
      userType: userType && userType !== "Select" ? userType : "",
      message: message.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("contactMessages").insertOne(contactDoc);

    return NextResponse.json(
      { message: "Contact message saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact save error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
