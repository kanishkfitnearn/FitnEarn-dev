// app/api/auth/signout/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const {
  NEXT_PUBLIC_COGNITO_DOMAIN,
  NEXT_PUBLIC_APP_CLIENT_ID,
  NEXT_PUBLIC_APP_CLIENT_SECRET,
  NEXT_PUBLIC_SITE_URL,
} = process.env;
const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  // const origin = request.nextUrl.origin;
  const origin =
    process.env.NODE_ENV === "production"
      ? NEXT_PUBLIC_SITE_URL
      : request.nextUrl.origin;

  const idTokenExists = cookieStore.has("id_token");
  const accessTokenExists = cookieStore.has("access_token");
  const refreshTokenExists = cookieStore.has("refresh_token");
  const genTokenExists = cookieStore.has("genToken");
  const userIdExists = cookieStore.has("user_id");
  const email = cookieStore.get("email");

  if (!refreshTokenExists) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const token = cookieStore.get("refresh_token");
  const authorizationHeader = `Basic ${Buffer.from(`${NEXT_PUBLIC_APP_CLIENT_ID}:${NEXT_PUBLIC_APP_CLIENT_SECRET}`).toString("base64")}`;

  const response = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/revoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorizationHeader,
    },
    body: new URLSearchParams({
      token: token?.value!,
    }),
  });

  if (!response.ok) {
    const data = await response.json();

    return NextResponse.json({
      error: data.error,
      error_description: data.error_description,
    });
  }

  if (response.ok) {
    if (idTokenExists) {
      cookieStore.delete("id_token");
    }

    if (accessTokenExists) {
      cookieStore.delete("access_token");
    }

    if (refreshTokenExists) {
      cookieStore.delete("refresh_token");
    }

    if (genTokenExists) {
      cookieStore.delete("genToken");
    }

    if (userIdExists) {
      cookieStore.delete("user_id");
    }

    if (email) {
      try {
        const backendResponse = await fetch(
          `${apiEndpoint}/api/fitnearn/web/users/logout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              userAgent: "web",
            }),
          },
        );

        const result = await backendResponse.json();
        //console.log(result);
        if (backendResponse.ok) {
          cookieStore.delete("email");
        }
        if (!backendResponse.ok) {
          const backendData = await backendResponse.json();
          //console.error("Backend logout error:", backendData);
        }
      } catch (error) {
        //console.error("Error logging out from backend:", error);
      }
    }

    return NextResponse.redirect(`${origin}/login`);
  }
}
