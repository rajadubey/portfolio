import { NextResponse } from 'next/server';

const CDN_URL =
  'https://ik.imagekit.io/interview0/portfolio/resume/Resume%20-%20Raja%20Dubey.pdf';

export async function GET() {
  const response = await fetch(CDN_URL);

  if (!response.ok) {
    return new NextResponse('Failed to fetch file', { status: 500 });
  }

  return new NextResponse(response.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="Resume - Raja Dubey.pdf"',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
