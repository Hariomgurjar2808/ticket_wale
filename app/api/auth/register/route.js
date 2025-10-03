// // import connectDB from '../../../lib/mongodb';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export async function POST(request) {
//   try {
//     const { db } = await connectDB();
    
//     const { name, email, password, phone } = await request.json();

//     // Validate input
//     if (!name || !email || !password) {
//       return Response.json(
//         { error: 'Name, email, and password are required' },
//         { status: 400 }
//       );
//     }

//     // Validate email format
//     const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     if (!emailRegex.test(email)) {
//       return Response.json(
//         { error: 'Please provide a valid email' },
//         { status: 400 }
//       );
//     }

//     // Validate password length
//     if (password.length < 6) {
//       return Response.json(
//         { error: 'Password must be at least 6 characters' },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists using native MongoDB client
//     const existingUser = await db.collection('users').findOne({ email });
//     if (existingUser) {
//       return Response.json(
//         { error: 'User with this email already exists' },
//         { status: 409 }
//       );
//     }

//     // Hash password
//     const saltRounds = 12;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create new user document
//     const newUser = {
//       name,
//       email,
//       password: hashedPassword,
//       phone: phone || '',
//       role: 'user',
//       isVerified: false,
//       profileImage: '',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };

//     // Insert user into database using native MongoDB client
//     const result = await db.collection('users').insertOne(newUser);
    
//     // Get the created user (without password)
//     const savedUser = await db.collection('users').findOne(
//       { _id: result.insertedId },
//       { projection: { password: 0 } }
//     );

//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: savedUser._id, 
//         email: savedUser.email,
//         role: savedUser.role 
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     return Response.json({
//       message: 'User registered successfully',
//       user: savedUser,
//       token,
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Registration error:', error);
    
//     return Response.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }




// app/api/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

// Ensure Node runtime (bcrypt doesn't work on Edge)
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db(); // defaults to DB in your URI (Ticket_wale)
    const { name, email, password, phone } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Validate email format (basic)
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Check existing user
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
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

    // Ensure JWT secret exists
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "Server is missing JWT_SECRET" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "User registered successfully", user: savedUser, token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
