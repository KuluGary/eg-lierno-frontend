import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secureUrls = ["/characters", "/campaigns", "/explore"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (secureUrls.includes(pathname)) {
    const session = await getToken({ req, secret: process.env.SECRET, raw: true });

    if (!session) return NextResponse.redirect("/");
  }

  // If user is authenticated, continue.
  return NextResponse.next();
}
