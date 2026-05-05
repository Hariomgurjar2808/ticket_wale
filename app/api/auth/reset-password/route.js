import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const client = await clientPromise;
    const db = client.db();

    const body = await request.json();
    const { email, phone, resetCode, newPassword } = body;

    if (!resetCode || !newPassword) {
      return NextResponse.json(
        { error: "Reset code and new password are required" },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone number is required" },
        { status: 400 }
      );
    }

    // Validate password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" },
        { status: 400 }
      );
    }

    let user = null;

    if (email) {
      user = await db.collection("users").findOne({
        email: email.toLowerCase().trim(),
      });
    } else if (phone) {
      user = await db.collection("users").findOne({
        phone: phone,
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if reset code exists and is valid
    if (!user.resetCode || user.resetCode !== resetCode) {
      return NextResponse.json(
        { error: "Invalid reset code" },
        { status: 400 }
      );
    }

    // Check if reset code has expired
    if (new Date() > new Date(user.resetCodeExpiry)) {
      return NextResponse.json(
        { error: "Reset code has expired" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password and clear reset code
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
        $unset: {
          resetCode: "",
          resetCodeExpiry: "",
        },
      }
    );

    return NextResponse.json(
      {
        message: "Password reset successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
