// components/common/youtube-embedded.tsx

import * as React from "react";
import { cn } from "@/lib/utils";

interface YouTubeEmbedProps {
  videoId: string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, className }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&showinfo=0`;

  return (
    <div className={cn("relative h-full w-full", className)}>
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};

YouTubeEmbed.displayName = "YouTubeEmbed";

export { YouTubeEmbed };