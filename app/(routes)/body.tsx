// app/(routes)/body.tsx
'use client';

import Image from 'next/image';

export default function Body() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="w-10/12 bg-cover">
        <Image
          src={'/jpg/Designer.jpeg'}
          alt="A modern and clean hospital reception area"
          height={800}
          width={1200}
          className="w-full h-auto rounded-2xl"
          priority
        />
      </div>
    </div>
  );
}