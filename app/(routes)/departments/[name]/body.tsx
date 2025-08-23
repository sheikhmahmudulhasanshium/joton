'use client'
import { doctorList } from "@/lib/data";
import { useParams } from "next/navigation";
import ProfileCard from "./card";
import Image from "next/image";
const Body = () => {
    const params=useParams()
    const DepartmentName=params.name
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
           <div className=" flex flex-col justify-between w-10/12  py-4 gap-1.5">
            
                <h1 className=" text-2xl ">Department of {DepartmentName}</h1> 
            </div>
       
           <div className="w-10/12 mb-8 bg-cover">
                                   <Image src={'/jpg/Designer.jpeg'} alt="p-1" height={100} width={100} className="w-full rounded-2xl"/>
                                    <Image src={'/jpg/Designer (1).jpeg'} alt="p-1" height={100} width={100} className="w-full rounded-2xl"/>
                                   <Image src={'/png/A welcoming and dive.png'} alt="p-1" height={100} width={100} className="w-full rounded-2xl"/>

                                   </div>
            <div className=" flex flex-col justify-center items-center  w-10/12 gap-20">
                <p className="">The department description will be there. It will be about the department. It will be 1-2 paragraph. The description would not be very large which might bore the user also no too short.</p>

                <h1 className=" text-2xl ">Meet Our Specialists for Consultation</h1> 
                <div className=" grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2  justify-center  mb-12 rounded-2xl gap-4">
                    {
                        doctorList.map((doctor,index)=>(
                            <ProfileCard key={index} data={doctor}/>
                        ))
                    }
                </div>
           
            </div>
       
             </div>
      );
}
 
export default Body;