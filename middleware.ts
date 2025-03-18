import { type NextRequest, NextResponse } from "next/server"

// Define allowed origins
const allowedOrigins = ["https://burgers-culture.tenhopedido.com", "https://tenhopedido.com"]

// Define the target URL
const targetUrl = "https://controle-bc.bubbleapps.io"

export function middleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get("origin") ?? ""
  const isAllowedOrigin = allowedOrigins.includes(origin)

  // Check if this is a preflight request (OPTIONS)
  const isPreflight = request.method === "OPTIONS"

  // Handle preflight requests
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Max-Age": "86400", // 24 hours
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // For actual requests, redirect to the target URL
  if (request.nextUrl.pathname.startsWith("/version-test/api")) {
    const url = new URL(request.url)
    const newUrl = new URL(url.pathname + url.search, targetUrl)

    const response = NextResponse.rewrite(newUrl)

    // Set CORS headers for the response
    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin)
    }
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/version-test/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
}

