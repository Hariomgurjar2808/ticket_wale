// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import clientPromise from "@/lib/mongodb";

// // Ensure Node runtime (bcrypt doesn't work on Edge)
// export const runtime = "nodejs";

// export async function POST(request) {
//   try {
//     const client = await clientPromise;
//     const db = client.db(); // defaults to DB in your URI
    
//     const { email, password } = await request.json();

//     // Validate input
//     if (!email || !password) {
//       return NextResponse.json(
//         { error: 'Email and password are required' },
//         { status: 400 }
//       );
//     }

//     // Find user by email using native MongoDB client
//     const user = await db.collection('users').findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Check password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: user._id, 
//         email: user.email,
//         role: user.role 
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     // Return user data (without password) and token
//     const userData = {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       isVerified: user.isVerified,
//     };

//     return NextResponse.json({
//       message: 'Login successful',
//       user: userData,
//       token,
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

// Ensure Node runtime (bcrypt doesn't work on Edge)
export const runtime = "nodejs";

export async function POST(request) {
  try {
    // 🔴 1. Check environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    // 🔴 2. Connect to DB
    const client = await clientPromise;
    const db = client.db(); // uses DB from URI

    const { email, password } = await request.json();

    // 🔴 3. Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 🔴 4. Normalize email (important)
    const normalizedEmail = email.toLowerCase();

    // 🔴 5. Find user
    const user = await db.collection("users").findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔴 6. Check password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 🔴 7. Generate JWT
    const token = jwt.sign(
      {
        userId: user._id.toString(), // ✅ important fix
        email: user.email,
        role: user.role || "user",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🔴 8. Safe user data (no password)
    const userData = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role || "user",
      isVerified: user.isVerified ?? true,
    };

    return NextResponse.json({
      message: "Login successful",
      user: userData,
      token,
    });

  } catch (error) {
    console.error("🔥 Login error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message, // 👈 helps debugging in Vercel logs
      },
      { status: 500 }
    );
  }
}