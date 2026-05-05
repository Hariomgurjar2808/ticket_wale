import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Helper function to generate a 6-digit reset code
function generateResetCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create email transporter
function createEmailTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// Helper function to send reset email
async function sendResetEmail(email, resetCode, userName) {
  try {
    const transporter = createEmailTransporter();

    const emailContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .header { color: #5b5ea6; font-size: 28px; font-weight: bold; margin-bottom: 20px; }
            .content { color: #333333; font-size: 16px; line-height: 1.6; }
            .code-box { background-color: #f0f0f0; border-left: 4px solid #5b5ea6; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .code { font-size: 32px; font-weight: bold; color: #5b5ea6; letter-spacing: 2px; text-align: center; }
            .footer { color: #999999; font-size: 12px; text-align: center; margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">🚌 Ticket Wales</div>
            <div class="content">
              <p>Hello ${userName},</p>
              <p>We received a request to reset your password. Use the code below to reset your password:</p>
              <div class="code-box">
                <div class="code">${resetCode}</div>
              </div>
              <p><strong>This code will expire in 10 minutes.</strong></p>
              <p>If you didn't request a password reset, you can safely ignore this email.</p>
              <p><strong>Do not share this code with anyone.</strong></p>
            </div>
            <div class="footer">
              <p>&copy; 2026 Ticket Wales Technologies Inc. All rights reserved.</p>
              <p>This is an automated email. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "🔐 Password Reset Code - Ticket Wales",
      html: emailContent,
    });

    console.log(`Reset email sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error;
  }
}

// Helper function to send SMS (mock implementation for now)
async function sendResetSMS(phone, resetCode) {
  // In a real application, you would use Twilio or similar service
  console.log(`Reset code for ${phone}: ${resetCode}`);
  return true;
}

export async function POST(request) {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const client = await clientPromise;
    const db = client.db();

    const body = await request.json();
    const { email, phone } = body;

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone number is required" },
        { status: 400 }
      );
    }

    let user = null;
    let contact = null;
    let contactMethod = null;

    if (email) {
      const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Please provide a valid email address" },
          { status: 400 }
        );
      }

      user = await db.collection("users").findOne({
        email: email.toLowerCase().trim(),
      });

      if (!user) {
        return NextResponse.json(
          { error: "No account found with this email" },
          { status: 404 }
        );
      }

      contact = email;
      contactMethod = "email";
    } else if (phone) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: "Phone number must be exactly 10 digits" },
          { status: 400 }
        );
      }

      user = await db.collection("users").findOne({
        phone: phone,
      });

      if (!user) {
        return NextResponse.json(
          { error: "No account found with this phone number" },
          { status: 404 }
        );
      }

      contact = phone;
      contactMethod = "phone";
    }

    // Generate reset code
    const resetCode = generateResetCode();
    const resetCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store reset code in database
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          resetCode: resetCode,
          resetCodeExpiry: resetCodeExpiry,
        },
      }
    );

    // Send reset code via email or SMS
    if (contactMethod === "email") {
      await sendResetEmail(contact, resetCode, user.name);
    } else {
      await sendResetSMS(contact, resetCode);
    }

    return NextResponse.json(
      {
        message: `Reset code sent to your ${contactMethod}. Please check your ${contactMethod} for the code.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send reset code. Please try again." },
      { status: 500 }
    );
  }
}
