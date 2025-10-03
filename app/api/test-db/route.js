import { NextResponse } from "next/server";
import clientPromise from '@/lib/mongodb';

export const runtime = "nodejs";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Test the connection by running a simple query
    await db.admin().ping();
    
    return NextResponse.json({
      message: 'Database connected successfully!',
      status: 'connected',
      timestamp: new Date().toISOString(),
      database: db.databaseName,
    });

  } catch (error) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({
      message: 'Database connection failed',
      status: 'error',
      error: error.message,
    }, { status: 500 });
  }
}