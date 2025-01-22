// app/api/auth/callback2/route.ts
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

type JwtPayload = {
  email?: string;
  [key: string]: any; // To accommodate other properties
};
const apiEndpoint =  NEXT_PUBLIC_BASE_API_ENDPOINT;
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
    //console.log("code in callback2", code);

    if (!code) {
      const error = searchParams.get("error");
      return NextResponse.json({ error: error || "Unknown error" });
    }

    const authorizationHeader = `Basic ${Buffer.from(`${NEXT_PUBLIC_APP_CLIENT_ID}:${NEXT_PUBLIC_APP_CLIENT_SECRET}`).toString("base64")}`;

    const requestBody = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: NEXT_PUBLIC_APP_CLIENT_ID as string,
      code: code,
      redirect_uri: `${origin}/api/auth/callback2`,
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
      //console.log("Cognito me error");
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

    const fcmToken = cookieStore.get("FcmToken");
    console.log("FcmToken", fcmToken?.value);

    try {
      console.log("backendAPI is called");
      console.log("backennd api endpoint",`${apiEndpoint}/api/fitnearn/web/users/login`);
      const backendResponse = await fetch(
        `${apiEndpoint}/api/fitnearn/web/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            userAgent: "web",
            authToken: data.id_token,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            fcmToken : fcmToken?.value
          }),
        },
      );

      if (!backendResponse.ok) {
        console.error(
          `Backend responded with status: ${backendResponse.status}`,
        );
        // return NextResponse.redirect(`${origin}/user-not-found`);
        const errorText = await backendResponse.text();
        console.error(`Error response: ${errorText}`);
        if (backendResponse.status === 404) {
          return NextResponse.redirect(`${origin}/signup`);
        }
        if (backendResponse.status === 403) {
          cookieStore.delete("refresh_token");
          cookieStore.delete("id_token");
          cookieStore.delete("email");
          cookieStore.delete("access_token");
          // return NextResponse.redirect(`${origin}/user-not-found`);
          const message = encodeURIComponent(errorText);
          return NextResponse.redirect(
            `${origin}/user-not-found?message=${message}`,
          );
        }
        // return NextResponse.json({
        //   error: `Backend error: ${backendResponse.status}`,
        // });
      }

      const backendData = await backendResponse.json();
      console.log("Raw backend response:", backendData);

      if (backendData.success) {
        // Redirect the user to the home page
        cookieStore.set("email", userEmail, { maxAge });
        cookieStore.set("user_id", backendData.userData._id, { maxAge });
        cookieStore.set("genToken", backendData.genToken, { maxAge });
        cookieStore.set("username", username, { maxAge: thirtyDay });
        // checking if user left any onboarding
        try {
          console.log("checking if user left any onboarding by this api :",`${apiEndpoint}/api/fitnearn/web/users/onboarding/status/${backendData.userData._id}`);
          const statusResponse = await fetch(
            `${apiEndpoint}/api/fitnearn/web/users/onboarding/status/${backendData.userData._id}`,
          );
          const statusResult = await statusResponse.json();

          if (statusResult.success) {
            console.log(`user dos'nt left any onboarding, so we r redirecting user to ${origin}`);
            return NextResponse.redirect(`${origin}`);
            // return NextResponse.redirect(`${NEXT_PUBLIC_SITE_URL}`);

          } else {
            //console.log(statusResult.message);
            console.log(`user left ${statusResult.missingPage} page during onboarding process`);
            return NextResponse.redirect(
              `${origin}/${statusResult.missingPage}`,
            );
          }
        } catch (err) {
          console.log("Error while checking a status", err);
        }
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
