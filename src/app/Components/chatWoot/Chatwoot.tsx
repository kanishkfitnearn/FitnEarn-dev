"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function Chatwoot() {
  const pathname = usePathname();

  // List of paths where Chatwoot should NOT appear
  const noChatwootPages = ["/login", "/signup","/username","/workoutHistory", "/chooseAvatar","/classes-for-you","/exercise-category","/explore-video-lib","/health-assesment","/onboard-subscription-plans","/r-w-blogs"];

  if (noChatwootPages.includes(pathname)) return null;

  return (
    <Script
      id="chatwoot-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(d,t) {
            var BASE_URL="https://app.chatwoot.com";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.defer = true;
            g.async = true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken: '4yr21ej2xCc4JbajtJR1cRSh',
                baseUrl: BASE_URL
              })
            }
          })(document,"script");
        `,
      }}
    />
  );
}
