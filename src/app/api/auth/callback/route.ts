// app/api/auth/callback/route.ts
import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const {
  NEXT_PUBLIC_COGNITO_DOMAIN,
  NEXT_PUBLIC_APP_CLIENT_ID,
  NEXT_PUBLIC_APP_CLIENT_SECRET,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_BASE_API_ENDPOINT,
} = process.env;
const apiEndpoint = NEXT_PUBLIC_BASE_API_ENDPOINT;
type JwtPayload = {
  email?: string;
  [key: string]: any; // To accommodate other properties
};

export async function GET(request: NextRequest) {
  try {
    // const origin = request.nextUrl.origin;
    const origin =
      process.env.NODE_ENV === "production"
        ? NEXT_PUBLIC_SITE_URL
        : request.nextUrl.origin;
    console.log("NEXT_PUBLIC_SITE_URL",NEXT_PUBLIC_SITE_URL);
    console.log("request.nextUrl.origin",request.nextUrl.origin);
    console.log("origin",origin);
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code") as string;
    //console.log("origin in callback", origin);

    if (!code) {
      const error = searchParams.get("error");
      return NextResponse.json({ error: error || "Unknown error" });
    }

    const authorizationHeader = `Basic ${Buffer.from(`${NEXT_PUBLIC_APP_CLIENT_ID}:${NEXT_PUBLIC_APP_CLIENT_SECRET}`).toString("base64")}`;

    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: NEXT_PUBLIC_APP_CLIENT_ID as string,
      code: code,
      redirect_uri: `${origin}/api/auth/callback`,
    });

    // Get tokens
    const res = await fetch(`${NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: authorizationHeader,
      },
      body: requestBody,
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      return NextResponse.json({
        error: data.error,
        error_description: data.error_description,
      });
    }

    // Store tokens in cookies
    const cookieStore = cookies();
    const maxAge = 86400; // 1 day in seconds
    const thirtyDay = 86400 * 30;

    cookieStore.set("id_token", data.id_token, { maxAge });
    cookieStore.set("access_token", data.access_token, { maxAge });
    cookieStore.set("refresh_token", data.refresh_token, { maxAge });

    const invite_token = cookieStore.get("invite_token");
    //console.log("invite_token",invite_token?.value);

    const decodedIdToken = jwt.decode(data.id_token);
    let userEmail: any;
    let username: any;

    if (decodedIdToken && typeof decodedIdToken !== "string") {
      userEmail = (decodedIdToken as JwtPayload).email;
      username = decodedIdToken["cognito:username"];
      //console.log("username :", username);
    }

    cookieStore.set("email", userEmail, { maxAge });
    //console.log("userEmail", userEmail);

    // if(res.ok){
    //   return NextResponse.redirect('${origin}/username');
    // }

    try {
      const backendResponse = await fetch(
        invite_token
          ? `${apiEndpoint}/api/fitnearn/web/users/signup?invite_token=${invite_token}`
          : `${apiEndpoint}/api/fitnearn/web/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
          }),
        },
      );

      if (!backendResponse.ok) {
        console.error(
          `Backend responded with status: ${backendResponse.status}`,
        );
        const errorText = await backendResponse.text();
        console.error(`Error response: ${errorText}`);
        // if user is already exist then redirect to login page
        return NextResponse.redirect(`${origin}/login`);
      }

      const responseText = await backendResponse.text();
      //console.log("Raw backend response:", responseText);

      let backendData;
      try {
        backendData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        return NextResponse.json({
          error: "Invalid JSON response from backend",
        });
      }

      //console.log("backendData", backendData);

      if (backendData.success) {
        // Redirect the user to the home page
        cookieStore.set("email", userEmail, { maxAge });
        cookieStore.set("user_id", backendData.user._id, { maxAge });
        cookieStore.set("username", username, { maxAge: thirtyDay });
        return NextResponse.redirect(`${origin}/username`);
      } else {
        // Handle the error case
        return NextResponse.json({
          error: backendData.error || "Unknown error",
        });
      }
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json({ error: "Error communicating with backend" });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
