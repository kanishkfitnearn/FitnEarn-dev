"use client";

import { useEffect } from "react";
import Script from "next/script";

const AdComponent = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        const ads = document.querySelectorAll(".adsbygoogle");
        ads.forEach((ad) => {
          if (!ad.getAttribute("data-ad-status")) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        });
      } catch (error) {
        console.error("AdSense rendering error:", error);
      }
    }
  }, []);

  return (
    <div style={{ width: "100%", textAlign: "center", margin: "20px 0" }}>
      {/* Google AdSense Script */}
      <Script
        id="adsense-script"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7766959809083010"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* AdSense Ad Block */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-7766959809083010"
        data-ad-slot="6969077536"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdComponent;
