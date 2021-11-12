import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // if (!req.cookies.token && pathname !== "/login") return NextResponse.redirect("/login");

  return NextResponse.next();
}
