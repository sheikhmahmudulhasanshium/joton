import { departments } from "@/lib/menu";
import Link from "next/link";
import Image from "next/image";
const Body = () => {
    return (
        <div className="flex flex-col items-center justify-between min-h-screen bg-gray-50 dark:bg-gray-900">
            
            <div className="w-10/12 mb-8 bg-cover">
                        <Image src={'/jpg/Designer.jpeg'} alt="p-1" height={100} width={100} className="w-full rounded-2xl"/>
            
                        </div>
            <div className=" flex flex-col justify-between w-full">
                <h1 className="text-2xl p-4 font-semibold">Our Departments</h1>
                <div className="grid grid-cols-2 lg:grid-cols-3 w-full justify-between gap-2 p-4 my-12 ">
                    {departments.map((dep,index)=>(
                        <Link key={index} href={dep.href} className="flex shrink-0 flex-col border rounded-2xl p-2 hover:opacity-70">
                            <div className="flex items-center gap-1.5">
                                {dep.icon}
                                <h2 className="font-semibold text-xl">{dep.title}</h2>

                            </div>
                            <div>
                                <p>
                                    {dep.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
      );
}
 
export default Body;