import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProfileCardProps } from "@/lib/types";
import { ArrowBigRight, Calendar, Clock, IdCardIcon } from "lucide-react";
import Image from "next/image";
interface ProfileCard{
    data:ProfileCardProps
}
const ProfileCard:React.FC<ProfileCard> = ({data}) => {
    return ( 
        <div className="flex flex-col rounded-2xl min-h-32 border justify-between hover:opacity-80 bg-accent">
            {data.imageUrl&&
                <Image src={'/jpg/symbol-main.jpg'} alt="" height={100} width={100} className="w-full h-40 rounded-t-2xl bg-accenty
                "/>
            }
            <div className="flex flex-col p-1 w-auto justify-between ">
                <h3 className=" font-semibold p-2 flex gap-1"><IdCardIcon/>{data.name}</h3>
                <div className="text-sm p-2 ">{data.degree?.map((degree,index)=>(
                    <p key={index}>{degree.name} ({degree.speciality}), {degree.institute}</p>
                ))}
                </div>
                <div className="w-full gap-2 flex justify-between p-2 ">
                    {data.schedule&&
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button >
                                <Calendar/>
                                <p>Schedule</p>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="gap-2 flex flex-col">
                            {data.schedule?.map((schedule,index)=>(
                                <p key={index} className="flex gap-1 items-center"><Clock/>{schedule.day} ({schedule.time_from}-{schedule.time_to})</p>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
}
                    <Button >
                        <p>Appointment</p>                        
                        <ArrowBigRight/>
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileCard;