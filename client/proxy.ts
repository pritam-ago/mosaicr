import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/forum(.*)', '/generate/general/(.*)', '/generate/jd(.*)']);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, redirectToSignIn } = await auth()

  if (!isAuthenticated && isProtectedRoute(req)) {
    const url = req.nextUrl.clone()
  url.pathname = '/auth'
  return NextResponse.rewrite(url)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}