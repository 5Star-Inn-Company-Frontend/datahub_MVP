import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";

const publicRoutes  =["/auth/register","/auth/signin"];

export default async function middleware(req:NextRequest){
    const storedItem = req.cookies.has("datahubToken");
    if(req.nextUrl.pathname.startsWith("/_next")){
        return NextResponse.next()
    }
    if(storedItem && req.nextUrl.pathname ==="/"){
        const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
    if(!storedItem && !publicRoutes.includes(req.nextUrl.pathname)){
        const absoluteURL = new URL("/auth/signin", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}