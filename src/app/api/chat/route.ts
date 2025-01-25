import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  // Here you would typically process the message and generate a response
  // For this example, we'll just echo the message back
  const response = `You said: ${message}`;

  return NextResponse.json({ response });
}