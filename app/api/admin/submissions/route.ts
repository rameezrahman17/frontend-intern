import { NextResponse } from 'next/server';
import { createClient } from '../../../../lib/supabase/server';

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== 'Bearer birthday_admin_token_valid') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase client could not be initialized' }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, submissions: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
