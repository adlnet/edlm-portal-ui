import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  if (pathname.startsWith('/_next')) {

    const url = request.nextUrl.clone();
    url.pathname = `/edlm-portal${pathname}`;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/_next/:path*',
};