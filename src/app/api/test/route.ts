import { NextResponse } from 'next/server'

export async function GET() {
  try {
    return NextResponse.json({ 
      message: 'API is working',
      env: {
        hasSecret: !!process.env.PAYLOAD_SECRET,
        hasUpstashUrl: !!process.env.UPSTASH_REDIS_REST_URL,
        hasUpstashToken: !!process.env.UPSTASH_REDIS_REST_TOKEN,
        serverUrl: process.env.NEXT_PUBLIC_SERVER_URL
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to test API' }, { status: 500 })
  }
}
