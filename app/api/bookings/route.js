import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
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

// GET - Fetch all bookings for authenticated user
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    const decoded = verifyToken(request);
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
    const userId = new ObjectId(decoded.userId);

    const bookingData = await request.json();
    
    // Validate required fields
    const { serviceType, from, to, departureDate, price } = bookingData;
    if (!serviceType || !from || !to || !departureDate || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: serviceType, from, to, departureDate, price' },
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
    const passengers = bookingData.passengers || 1;
    if (passengers < 1) {
      return NextResponse.json(
        { error: 'At least 1 passenger required' },
        { status: 400 }
      );
    }

    // Create new booking document
    const newBooking = {
      userId,
      serviceType,
      from,
      to,
      departureDate: new Date(departureDate),
      returnDate: bookingData.returnDate ? new Date(bookingData.returnDate) : null,
      passengers,
      status: 'pending',
      price,
      paymentStatus: 'pending',
      bookingReference: generateBookingReference(serviceType),
      specialRequests: bookingData.specialRequests || '',
      contact: {
        email: bookingData.contact?.email || '',
        phone: bookingData.contact?.phone || '',
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

    return NextResponse.json({
      message: 'Booking created successfully',
      booking: populatedBooking[0],
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