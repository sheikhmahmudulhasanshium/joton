import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images:{
      remotePatterns:[
        {
          protocol:'https',
          hostname:'raw.githubusercontent.com'
        },
        {
          protocol:'https',
          hostname:'i.pravatar.cc',
        },
        {
          protocol:'https',
          hostname:'images.unsplash.com',
        },
        {
          protocol:'https',
          hostname:'picsum.photos'
        },
        {
          protocol:'https',
          hostname:'res.cloudinary.com'
        },
      ]
    }
};

export default nextConfig;
