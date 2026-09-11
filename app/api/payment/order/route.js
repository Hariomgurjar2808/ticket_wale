import https from "https";
import axios from "axios";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Payment gateway configuration is missing" },
        { status: 500 }
      );
    }

    const orderPayload = {
      amount: Number(amount),
      currency,
      receipt: receipt || `ticket-wales-${Date.now()}`,
      payment_capture: 1,
    };

    const httpsAgent = new https.Agent({
      rejectUnauthorized: process.env.NODE_ENV === "production",
    });

    const response = await axios.post(
      "https://api.razorpay.com/v1/orders",
      orderPayload,
      {
        auth: {
          username: keyId,
          password: keySecret,
        },
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent,
        timeout: 15000,
      }
    );

    return NextResponse.json({ order: response.data, keyId }, { status: 201 });
  } catch (error) {
    console.error("Create Razorpay order error:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status || 500;
        const message =
          error.response.data?.error?.description ||
          error.response.data?.error?.message ||
          error.response.data?.error ||
          error.response.data ||
          "Unable to create payment order";

        return NextResponse.json({ error: message }, { status });
      }

      if (error.request) {
        return NextResponse.json(
          { error: "No response received from Razorpay. Please try again later." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(
      { error: error.message || "Unable to create payment order" },
      { status: 500 }
    );
  }
}
