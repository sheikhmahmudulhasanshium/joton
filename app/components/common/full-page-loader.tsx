// app/components/common/full-page-loader.tsx
'use client';

import Image from 'next/image';

export function FullPageLoader() {
  return (
    // This outer div creates the full-screen container.
    // The flex properties center its direct child both vertically and horizontally.
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">

      {/* 
        The key change is here. We REMOVED the `w-full h-full` classes from the Image component.
        Now, the `width` and `height` props control the final display size, preventing any
        blurry stretching and preserving the image's quality.
      */}
      <Image
        src={'/gif/Frame-1-1--unscreen.gif'}
        
        // A more descriptive alt text for better accessibility.
        alt="Loading animation"
        
        // Increase the size for more prominence. 
        // IMPORTANT: For the best quality, this should ideally match the actual
        // pixel dimensions of your source GIF file. 200x200 is a good starting point.
        width={200}
        height={200}
        
        // The `priority` prop tells Next.js to preload this image, making it
        // appear faster. This is critical for a loader that is the first thing users see.
        priority
        
        // The `unoptimized` prop is recommended for GIFs to ensure the animation
        // plays correctly and isn't converted to a static image format.
        unoptimized
      />
    </div>
  );
}