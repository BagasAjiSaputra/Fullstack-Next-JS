import { NextResponse, type NextRequest } from 'next/server';
import { consumeRateLimit } from '@/lib/limiter'; 

export async function middleware(request: NextRequest) { 
  if (request.nextUrl.pathname.startsWith('/api/') || request.nextUrl.pathname === '/') {
    
    const key = request.cookies.get('sessionId')?.value || 'unknown_public_user'; 

    const { success, isBanned, limit, remaining, reset } = await consumeRateLimit(key);
    
    if (!success) {
      const errorMessage = isBanned
        ? `429 Too Many Requests! Anda diblokir selama ${Math.ceil(reset / 60)} menit. Coba lagi dalam ${reset} detik.`
        : '429 Too Many Requests!'; 

      const response = NextResponse.json(
        { error: errorMessage }, 
        { status: 429 }
      );
      
      response.headers.set('X-RateLimit-Limit', limit.toString());
      response.headers.set('X-RateLimit-Remaining', remaining.toString());
      
      response.headers.set('Retry-After', reset.toString()); 
      response.headers.set('X-Blocked-For', isBanned ? `${reset}s` : '0s'); 
      
      return response;
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', limit.toString());
    response.headers.set('X-RateLimit-Remaining', remaining.toString());
    response.headers.set('Retry-After', reset.toString()); 
    response.headers.set('X-Blocked-For', '0s'); 
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*', 
    '/', 
  ],
};
