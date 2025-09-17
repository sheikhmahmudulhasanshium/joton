// app/page.tsx

import { YouTubeEmbed } from "../components/common/youtube-embedded";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Body() {
  const yourVideoId = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID;

  if (!yourVideoId) {
    console.error("YouTube Video ID is not set in environment variables.");
    return null; 
  }

  return (
    <main>
      {/* 
        SECTION 1: THE HERO VIDEO BANNER
        This container is now guaranteed to be a 16:9 rectangle.
      */}
      <div className="relative w-full aspect-video max-h-[700px] lg:max-h-[85vh]">
        {/* The YouTubeEmbed component fills this perfectly shaped container */}
        <YouTubeEmbed videoId={yourVideoId} />
        
        {/* The overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 
        SECTION 2: YOUR PAGE CONTENT
      */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            A Powerful & Modern Hospital Management System
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Joton provides a comprehensive, all-in-one solution to manage every
            aspect of your hospital or clinic, from patient intake to billing.
            Free your team to focus on what matters most.
          </p>
        </div>

        <Separator className="my-12" />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Streamline Your Operations
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our intuitive platform centralizes patient records, scheduling, and
              staff management, reducing administrative overhead and minimizing
              errors.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Empower Your Staff
            </h2>
            <p className="mt-3 text-muted-foreground">
              With instant access to accurate data, your doctors, nurses, and
              administrators can make better decisions faster, leading to
              improved patient outcomes.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
            <Button size="lg">Request a Demo</Button>
        </div>
      </div>
    </main>
  );
}