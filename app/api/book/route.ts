import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface BookingRequest {
  fullName?: string;
  phone?: string;
  service?: string;
  date?: string;
  time?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    // Validate required fields
    const { fullName, phone, service, date, time } = body;
    // 🚫 Prevent past date bookings
const today = new Date().toISOString().split('T')[0];

if (date && date < today) {
  return NextResponse.json(
    {
      success: false,
      message: 'Cannot book past dates',
    },
    { status: 400 }
  );
}
    if (!fullName || !phone || !service || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields: fullName, phone, service, date, time',
        },
        { status: 400 }
      );
    }

    // Insert booking into Supabase
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          fullName,
          phone,
          service,
          date,
          time,
          notes: body.notes || null,
          status: 'pending',
        },
      ])
      .select();

    if (error) {
      console.error('❌ Supabase Insert Error:', error);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save booking',
        },
        { status: 500 }
      );
    }

    console.log('✅ Booking Saved to Supabase:', data);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Booking saved successfully',
        data: data[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Booking API Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process booking request',
      },
      { status: 500 }
    );
  }
}
