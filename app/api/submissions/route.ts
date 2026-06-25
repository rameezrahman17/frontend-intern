import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase client could not be initialized' }, { status: 500 });
    }

    const userAgent = request.headers.get('user-agent') || 'Unknown';

    const { error } = await supabase
      .from('submissions')
      .insert([
        {
          recipient_name: body.recipient_name,
          wants_gift: body.wants_gift,
          gift_choice: body.gift_choice,
          treat_date: body.treat_date,
          treat_time: body.treat_time,
          user_agent: userAgent,
        }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
