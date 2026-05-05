import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const client = await clientPromise;
    const db = client.db();

    const { name, email, password, phone } = await request.json();

    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Name, email, password, and phone are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email" },
        { status: 400 }
      );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" },
        { status: 400 }
      );
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: "Phone number must be exactly 10 digits" },
        { status: 400 }
      );
    }

    const existingUser = await db.collection("users").findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone.trim(),
      role: "user",
      isVerified: false,
      profileImage: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    const savedUser = await db.collection("users").findOne(
      { _id: result.insertedId },
      { projection: { password: 0 } }
    );

    if (!savedUser) {
      return NextResponse.json(
        { error: "Failed to fetch saved user" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        userId: savedUser._id.toString(),
        email: savedUser.email,
        role: savedUser.role || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          ...savedUser,
          _id: savedUser._id.toString(),
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}