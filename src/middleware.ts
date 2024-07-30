import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.includes('/authentication')) {
		let sessionCookie = request.cookies.get('__session');
		if (sessionCookie) return NextResponse.redirect(new URL('/', request.url));

		return NextResponse.next();
	} else {
		let sessionCookie = request.cookies.get('__session');
		if (!sessionCookie) return NextResponse.redirect(new URL('/authentication', request.url));

		return NextResponse.next();
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|logo.png|favicon.ico).*)',
	],
};
