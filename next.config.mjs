/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@aldabil/react-scheduler", "date-fns"],
  experimental: {
    esmExternals: "loose",
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
  images: {
    domains: [
      "s3-alpha-sig.figma.com",
      "avatarimagesfne.s3.ap-south-1.amazonaws.com",
      "fitnearn-be-web-dev.s3.ap-south-1.amazonaws.com",
      "fitnearn-be-web-dev.s3.amazonaws.com",
      "www.figma.com",
      "th.bing.com",
      "www.rionachoflynn.com",
      "uiimagesfnew.s3.ap-south-1.amazonaws.com",
      "sreeramkrishnayogasram.com",
      "yogaflowsf.com",
      "raftingcampingrishikesh.com",
      "omyogainternational.com",
      "images.indianexpress.com",
      "www.tonal.com",
      "userimagesfne.s3.ap-south-1.amazonaws.com",
      "coachprofileimagesfne.s3.ap-south-1.amazonaws.com",
      "d1r8ufeo65w9au.cloudfront.net",
      "images.unsplash.com",
      "assets.aceternity.com",
      "source.unsplash.com",
      "picsum.photos",
      "d2fs1ljfvwyo4t.cloudfront.net",
      "commonbucketprod.s3.ap-south-1.amazonaws.com",
      "workoutvideosfnewprod.s3.ap-south-1.amazonaws.com",
      "thumbnailworkoutprod.s3.ap-south-1.amazonaws.com",
      "querybucketfnewprod.s3.ap-south-1.amazonaws.com",
      "fitnearn-be-web-prod.s3.ap-south-1.amazonaws.com",
      "https://d2fs1ljfvwyo4t.cloudfront.net",
      "https://d2uxhxwe37vxuh.cloudfront.net", 

    ],
  },
};

export default nextConfig;

