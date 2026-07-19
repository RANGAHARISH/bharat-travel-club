import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase.from("bookings").insert({
      user_id: body.user_id,
      trip_id: body.trip_id,
      batch_id: body.batch_id,
      num_travelers: body.num_travelers,
      traveler_details: body.travelers,
      total_amount: body.total_amount,
      payment_status: "pending",
      booking_status: "pending",
    }).select().single();

    if (error) throw error;
    return NextResponse.json({ success: true, booking: data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
