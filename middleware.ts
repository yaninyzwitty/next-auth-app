import  { auth   } from "@/auth"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./lib/routes";
import { NextResponse } from "next/server";


export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    // go to the next function
    if(isApiRoute) {
        return NextResponse.next()
    }

    if(isAuthRoute)  {
        if(isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return NextResponse.next()
    };
    

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }
    
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    
        return Response.redirect(new URL(
          `/auth/login?callbackUrl=${encodedCallbackUrl}`,
          nextUrl
        ));
      }


    return NextResponse.next()

  })


  export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  }


