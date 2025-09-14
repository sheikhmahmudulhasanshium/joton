'use client'

import { doctorList,  } from "@/lib/data";
import { useParams } from "next/navigation";
import Image from "next/image";
import { DoctorProfileCard } from "./card";
import { departments } from "@/lib/menu";

const Body = () => {
    const params = useParams();
    const departmentSlug = Array.isArray(params.name) ? params.name[0] : params.name;

    if (!departmentSlug) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
                <p className="text-xl">Loading Department...</p>
            </div>
        );
    }

    // --- FIX: Find the department by matching the URL slug to the `href` property ---
    // This is much more reliable than matching against the title.
    const departmentData = departments.find(
        (dept) => dept.href === `/departments/${departmentSlug}`
    );

    // The rest of the logic now works correctly because `departmentData` will be found.
    const specialists = doctorList.filter(
        (doctor) => doctor.department.toLowerCase() === departmentData?.title.toLowerCase()
    );

    // This is a fallback for the page title in case the department isn't found in our data
    const formattedTitle = departmentSlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
            <div className="w-11/12 max-w-7xl mx-auto space-y-16">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Department of {departmentData?.title || formattedTitle}
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            {departmentData?.description || "A detailed description of our department's services, goals, and commitment to patient care."}
                        </p>
                    </div>
                    <div className="w-full h-80 relative rounded-2xl overflow-hidden shadow-lg">
                        <Image 
                            src={departmentData?.imageUrl || '/jpg/Designer.jpeg'}
                            alt={departmentData?.title || formattedTitle}
                            fill={true}
                            style={{objectFit: 'cover'}}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center w-full gap-8">
                    <h2 className="text-3xl font-bold text-center">
                        Meet Our Specialists
                    </h2> 
                    
                    {specialists.length > 0 ? (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {specialists.map((doctor) => (
                                <DoctorProfileCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>
                    ) : (
                         <p className="text-center text-gray-500 dark:text-gray-400 mt-4">
                            Our specialists for this department will be listed here soon.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
 
export default Body;