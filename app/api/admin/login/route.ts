import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
    }

    return NextResponse.json({ success: true, token: 'birthday_admin_token_valid' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
