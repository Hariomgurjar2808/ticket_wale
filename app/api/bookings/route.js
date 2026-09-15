import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import clientPromise from '@/lib/mongodb';

// Ensure Node runtime
export const runtime = "nodejs";

// Helper function to verify JWT token
function verifyToken(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  
  const token = authHeader.substring(7);
  return jwt.verify(token, process.env.JWT_SECRET);
}

// Helper function to generate booking reference
function generateBookingReference(serviceType) {
  const prefix = serviceType.toUpperCase().substring(0, 3);
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}

function createMailTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const missingConfig = [];

  if (!SMTP_HOST) {
    missingConfig.push('SMTP_HOST');
  }
  if (!SMTP_PORT) {
    missingConfig.push('SMTP_PORT');
  }
  if (!SMTP_USER) {
    missingConfig.push('SMTP_USER');
  }
  if (!SMTP_PASS) {
    missingConfig.push('SMTP_PASS');
  }

  if (missingConfig.length > 0) {
    return { transporter: null, missingConfig };
  }

  return {
    transporter: nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    }),
    missingConfig: [],
  };
}

async function sendBookingConfirmationEmail({ booking, user }) {
  const { transporter, missingConfig } = createMailTransporter();

  if (!transporter) {
    return {
      sent: false,
      reason: 'missing-email-config',
      missingConfig,
      message: `Missing SMTP configuration: ${missingConfig.join(', ')}`,
    };
  }

  const fromEmail = process.env.FROM_EMAIL || process.env.SMTP_USER;
  const recipientEmail = booking.contact?.email || user?.email || booking?.user?.email;

  if (!recipientEmail) {
    return {
      sent: false,
      reason: 'missing-recipient-email',
      message: 'Logged in user email is missing',
    };
  }

  const passengerList = Array.isArray(booking.passengerDetails)
    ? booking.passengerDetails
        .map(
          (passenger, index) =>
            `${index + 1}. ${passenger.name} (Age: ${passenger.age}, Seat: ${passenger.seatLabel})`
        )
        .join('\n')
    : 'Passenger details not available';

  const passengerListHtml = Array.isArray(booking.passengerDetails)
    ? booking.passengerDetails
        .map(
          (passenger, index) =>
            `<li style="margin-bottom:8px;"><strong>Passenger ${index + 1}</strong>: ${passenger.name} | Age: ${passenger.age} | Seat: ${passenger.seatLabel}</li>`
        )
        .join('')
    : '<li>Passenger details not available</li>';

  const mailOptions = {
    from: fromEmail,
    to: recipientEmail,
    subject: `Ticket Wales Booking Confirmed - ${booking.bookingReference}`,
    text: `Hello ${user.name || 'Customer'},

Your payment was successful and your booking is confirmed.

Booking Reference: ${booking.bookingReference}
Route: ${booking.from} to ${booking.to}
Travel Date: ${new Date(booking.departureDate).toDateString()}
Bus: ${booking.busName || 'Bus service'}
Timings: ${booking.startTime || '-'} to ${booking.reachTime || '-'}
Seats: ${Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : '-'}
Payment Method: ${booking.paymentMethod || '-'}
Total Fare: Rs ${booking.price}

Passenger Details:
${passengerList}

Thank you for booking with Ticket Wales.
`,
    html: `
      <div style="font-family: Arial, sans-serif; background:#f8fafc; padding:24px; color:#111827;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:18px; overflow:hidden; border:1px solid #e5e7eb;">
          <div style="padding:24px 28px; background:linear-gradient(135deg, #111827 0%, #292c6d 50%, #5b5ea6 100%); color:#ffffff;">
            <div style="font-size:12px; letter-spacing:0.2em; opacity:0.8; margin-bottom:10px;">TICKET WALES</div>
            <h1 style="margin:0; font-size:28px; line-height:1.2;">Booking Confirmed</h1>
            <p style="margin:12px 0 0; opacity:0.9;">Hello ${user.name || 'Customer'}, your payment was successful and your bus booking is confirmed.</p>
          </div>
          <div style="padding:24px 28px;">
            <div style="margin-bottom:20px; padding:18px; border-radius:16px; background:linear-gradient(135deg, #eef2ff 0%, #fff7ed 100%);">
              <div style="font-size:12px; color:#6b7280; margin-bottom:6px;">Booking Reference</div>
              <div style="font-size:24px; font-weight:700; color:#111827;">${booking.bookingReference}</div>
            </div>

            <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Trip Details</h2>
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
              <tr><td style="padding:8px 0; color:#6b7280;">Route</td><td style="padding:8px 0; font-weight:600; text-align:right;">${booking.from} to ${booking.to}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280;">Travel Date</td><td style="padding:8px 0; font-weight:600; text-align:right;">${new Date(booking.departureDate).toDateString()}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280;">Bus Name</td><td style="padding:8px 0; font-weight:600; text-align:right;">${booking.busName || 'Bus service'}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280;">Timings</td><td style="padding:8px 0; font-weight:600; text-align:right;">${booking.startTime || '-'} to ${booking.reachTime || '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280;">Seats</td><td style="padding:8px 0; font-weight:600; text-align:right;">${Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280;">Payment Method</td><td style="padding:8px 0; font-weight:600; text-align:right;">${booking.paymentMethod || '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280;">Total Fare</td><td style="padding:8px 0; font-weight:700; text-align:right;">Rs ${booking.price}</td></tr>
            </table>

            <h2 style="font-size:18px; margin:0 0 12px; color:#111827;">Passenger Details</h2>
            <ul style="margin:0; padding-left:18px; color:#374151;">${passengerListHtml}</ul>

            <div style="margin-top:24px; padding:16px; border-radius:14px; background:#f8fafc; color:#4b5563;">
              Thank you for booking with Ticket Wales. This email was sent to your logged-in account: ${recipientEmail}
            </div>
          </div>
        </div>
      </div>
    `,
  };

  // generate PDF ticket and attach
  try {
    const pdfBuffer = await generateTicketPDF({ booking, user });
    mailOptions.attachments = [
      {
        filename: `${booking.bookingReference}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ];
  } catch (pdfErr) {
    console.error('Failed to generate ticket PDF:', pdfErr);
    // continue without attachment
  }

  try {
    await transporter.sendMail(mailOptions);
    return { sent: true };
  } catch (error) {
    console.error('Booking confirmation email error:', error);
    return {
      sent: false,
      reason: 'send-failed',
      message: error.message || 'Email transport failed',
    };
  }
}

async function generateTicketPDF({ booking, user }) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const { width, height } = page.getSize();
  const margin = 50;
  let y = height - margin;
  const lineHeight = 18;

  page.drawText('Ticket Wales', {
    x: margin,
    y,
    size: 24,
    font: helveticaBold,
    color: rgb(0.07, 0.09, 0.18),
  });

  y -= 32;
  page.drawText(`Booking Reference: ${booking.bookingReference}`, {
    x: margin,
    y,
    size: 12,
    font: helvetica,
    color: rgb(0.22, 0.28, 0.33),
  });

  y -= 28;
  page.drawText('Trip Details', {
    x: margin,
    y,
    size: 14,
    font: helveticaBold,
    color: rgb(0.07, 0.09, 0.18),
  });

  y -= 22;
  const tripLines = [
    `Route: ${booking.from} to ${booking.to}`,
    `Travel Date: ${new Date(booking.departureDate).toDateString()}`,
    `Bus: ${booking.busName || 'Bus service'}`,
    `Timings: ${booking.startTime || '-'} to ${booking.reachTime || '-'}`,
    `Seats: ${Array.isArray(booking.seatNumbers) ? booking.seatNumbers.join(', ') : '-'}`,
    `Passengers: ${booking.passengers || 1}`,
    `Total Fare: Rs ${booking.price}`,
  ];
  tripLines.forEach((line) => {
    page.drawText(line, {
      x: margin,
      y,
      size: 11,
      font: helvetica,
      color: rgb(0.24, 0.27, 0.31),
    });
    y -= lineHeight;
  });

  y -= 14;
  page.drawText('Passenger Details', {
    x: margin,
    y,
    size: 14,
    font: helveticaBold,
    color: rgb(0.07, 0.09, 0.18),
  });

  y -= 22;
  if (Array.isArray(booking.passengerDetails) && booking.passengerDetails.length) {
    booking.passengerDetails.forEach((passenger, idx) => {
      const passengerText = `${idx + 1}. ${passenger.name} | Age: ${passenger.age} | Seat: ${passenger.seatLabel}`;
      page.drawText(passengerText, {
        x: margin,
        y,
        size: 11,
        font: helvetica,
        color: rgb(0.24, 0.27, 0.31),
      });
      y -= lineHeight;
    });
  } else {
    page.drawText('Passenger details not available', {
      x: margin,
      y,
      size: 11,
      font: helvetica,
      color: rgb(0.24, 0.27, 0.31),
    });
    y -= lineHeight;
  }

  y -= 14;
  const footerText = 'Welcome aboard! We wish you a pleasant journey. Please carry a valid ID when boarding.';
  page.drawText(footerText, {
    x: margin,
    y,
    size: 11,
    font: helvetica,
    color: rgb(0.44, 0.48, 0.52),
    maxWidth: width - margin * 2,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

// GET - Fetch all bookings for authenticated user
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const decoded = verifyToken(request);
    if (!ObjectId.isValid(decoded.userId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = new ObjectId(decoded.userId);

    // Use aggregation to join user data using native MongoDB client
    const bookings = await db.collection('bookings').aggregate([
      { $match: { userId } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            { $project: { name: 1, email: 1 } }
          ]
        }
      },
      { $unwind: '$user' },
      { $sort: { createdAt: -1 } }
    ]).toArray();

    return NextResponse.json({
      bookings,
      count: bookings.length,
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.message === 'No token provided') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new booking
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const decoded = verifyToken(request);
    if (!ObjectId.isValid(decoded.userId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = new ObjectId(decoded.userId);

    const authUser = await db.collection('users').findOne(
      { _id: userId },
      { projection: { email: 1, phone: 1, name: 1 } }
    );

    if (!authUser?.email) {
      return NextResponse.json(
        { error: 'Logged-in user email is missing from the registered account' },
        { status: 400 }
      );
    }

    const bookingData = await request.json();
    
    // Validate required fields
    const { serviceType, from, to, departureDate, price } = bookingData;
    if (!serviceType || !from || !to || !departureDate || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceType, from, to, departureDate, price' },
        { status: 400 }
      );
    }

    if (String(from).trim().toLowerCase() === String(to).trim().toLowerCase()) {
      return NextResponse.json(
        { error: 'Pickup and destination locations must be different' },
        { status: 400 }
      );
    }

    const dateParts = String(departureDate).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const parsedDepartureDate = dateParts
      ? new Date(
          Number(dateParts[1]),
          Number(dateParts[2]) - 1,
          Number(dateParts[3])
        )
      : new Date('invalid');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isValidCalendarDate =
      dateParts &&
      parsedDepartureDate.getFullYear() === Number(dateParts[1]) &&
      parsedDepartureDate.getMonth() === Number(dateParts[2]) - 1 &&
      parsedDepartureDate.getDate() === Number(dateParts[3]);
    if (Number.isNaN(parsedDepartureDate.getTime()) || !isValidCalendarDate) {
      return NextResponse.json({ error: 'Invalid departure date' }, { status: 400 });
    }
    parsedDepartureDate.setHours(0, 0, 0, 0);
    if (parsedDepartureDate < today) {
      return NextResponse.json(
        { error: 'Departure date cannot be in the past' },
        { status: 400 }
      );
    }

    // Validate serviceType
    const validServiceTypes = ['flight', 'hotel', 'bus', 'auto', 'bike', 'parcel'];
    if (!validServiceTypes.includes(serviceType)) {
      return NextResponse.json(
        { error: 'Invalid service type' },
        { status: 400 }
      );
    }

    // Validate price
    if (price < 0) {
      return NextResponse.json(
        { error: 'Price cannot be negative' },
        { status: 400 }
      );
    }

    // Validate passengers
    const passengerCount = Number(bookingData.passengers || 1);
    if (passengerCount < 1) {
      return NextResponse.json(
        { error: 'At least 1 passenger required' },
        { status: 400 }
      );
    }

    const passengerDetails = Array.isArray(bookingData.passengerDetails)
      ? bookingData.passengerDetails
      : [];

    if (passengerDetails.length !== passengerCount) {
      return NextResponse.json(
        { error: 'Passenger details count must match selected seats' },
        { status: 400 }
      );
    }

    const hasInvalidPassenger = passengerDetails.some((passenger) => {
      const age = Number(passenger?.age);
      return (
        !passenger?.name?.trim() ||
        !Number.isInteger(age) ||
        age < 1 ||
        age > 120
      );
    });
    if (hasInvalidPassenger) {
      return NextResponse.json(
        { error: 'Each passenger must have a name and an age from 1 to 120' },
        { status: 400 }
      );
    }

    const paymentMethod = bookingData.paymentMethod || '';
    if (!paymentMethod) {
      return NextResponse.json(
        { error: 'Payment method is required' },
        { status: 400 }
      );
    }

    const seatNumbers = Array.isArray(bookingData.seatNumbers)
      ? bookingData.seatNumbers
      : String(bookingData.seatNumbers || '')
          .split(',')
          .map((seat) => seat.trim())
          .filter(Boolean);

    // Create new booking document
    const newBooking = {
      userId,
      serviceType,
      from,
      to,
      departureDate: parsedDepartureDate,
      returnDate: bookingData.returnDate ? new Date(bookingData.returnDate) : null,
      passengers: passengerCount,
      passengerDetails,
      status: 'confirmed',
      price,
      paymentStatus: 'paid',
      bookingReference: generateBookingReference(serviceType),
      busName: bookingData.busName || '',
      startTime: bookingData.startTime || '',
      reachTime: bookingData.reachTime || '',
      seatNumbers,
      paymentMethod,
      specialRequests: bookingData.specialRequests || '',
      contact: {
        email: authUser?.email || decoded.email || '',
        phone: authUser?.phone || '',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert booking into database using native MongoDB client
    const result = await db.collection('bookings').insertOne(newBooking);
    
    // Get the created booking with user data
    const populatedBooking = await db.collection('bookings').aggregate([
      { $match: { _id: result.insertedId } },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
          pipeline: [
            { $project: { name: 1, email: 1 } }
          ]
        }
      },
      { $unwind: '$user' }
    ]).toArray();

    const booking = populatedBooking[0];
    const emailStatus = await sendBookingConfirmationEmail({
      booking,
      user: booking.user,
    });

    return NextResponse.json({
      message: emailStatus.sent
        ? 'Payment successful and confirmation email sent'
        : emailStatus.reason === 'missing-email-config'
          ? `Payment successful but email is not configured on the server. Missing: ${emailStatus.missingConfig.join(', ')}`
          : emailStatus.reason === 'missing-recipient-email'
            ? 'Payment successful but the logged-in user email is missing'
          : `Payment successful but confirmation email could not be sent: ${emailStatus.message}`,
      booking,
      emailStatus,
    }, { status: 201 });

  } catch (error) {
    console.error('Create booking error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.message === 'No token provided') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}