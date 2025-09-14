import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ArrowRight, CalendarDays, GraduationCap, Stethoscope } from "lucide-react";

// Define the type for a single doctor object, based on your provided data structure.
// In a real project, this would likely live in a `lib/types.ts` file.
interface Degree {
  name: string;
  institute: string;
  speciality: string;
  passing_year: string;
}

interface Schedule {
  day: string;
  time_from: string;
  time_to: string;
}

export interface Doctor {
  id: string;
  name: string;
  imageUrl: string;
  department: string;
  bio: string;
  experience_years: number;
  consultation_fee: number;
  languages: string[];
  rating: number;
  review_count: number;
  contact: {
    phone: string;
    email: string;
  };
  degree: Degree[];
  schedule: Schedule[];
  featured: boolean;
}

// Define the props for our component
interface DoctorProfileCardProps {
  doctor: Doctor;
}

export const DoctorProfileCard: React.FC<DoctorProfileCardProps> = ({ doctor }) => {
  // Helper to generate initials for the Avatar fallback
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    // Handle names like "Dr. James Clark" -> "JC"
    const relevantParts = parts.length > 1 ? parts.slice(1) : parts;
    return relevantParts.map((part) => part[0]).join('').toUpperCase();
  };

  return (
    <Card className="flex flex-col h-full w-full max-w-sm overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="relative h-40 w-full p-0">
        {/* Using a background image for better control */}
        <div
          className="h-full w-full rounded-t-2xl bg-cover bg-center"
          style={{ backgroundImage: `url(${doctor.imageUrl})` }}
        />
        <Avatar className="absolute bottom-0 left-4 h-24 w-24 translate-y-1/2 rounded-full border-4 border-background">
          <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
          <AvatarFallback className="text-2xl font-semibold">
            {getInitials(doctor.name)}
          </AvatarFallback>
        </Avatar>
      </CardHeader>

      {/* Adding extra top padding to account for the overlapping avatar */}
      <CardContent className="flex-grow px-4 pt-16 pb-4">
        <h3 className="text-xl font-bold text-primary">{doctor.name}</h3>
        <p className="text-sm font-medium text-muted-foreground">{doctor.department}</p>
        
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <GraduationCap className="h-4 w-4 flex-shrink-0 translate-y-0.5 text-muted-foreground" />
            <div>
              {doctor.degree.map((deg, index) => (
                <p key={index} className="text-foreground">
                  {deg.name} ({deg.speciality})
                  <span className="block text-xs text-muted-foreground">{deg.institute}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Stethoscope className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <p className="text-foreground">{doctor.experience_years} years of experience</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t bg-muted/50 p-4">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline" size="sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              Schedule
            </Button>
          </HoverCardTrigger>
          <HoverCardContent align="start" className="w-auto p-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-center text-primary">Availability</h4>
              {doctor.schedule.map((slot, index) => (
                <div key={index} className="flex items-center gap-4 text-sm">
                  <span className="font-medium text-foreground w-20">{slot.day}</span>
                  <span className="text-muted-foreground">{slot.time_from} - {slot.time_to}</span>
                </div>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>

        <Button size="sm">
          View Profile
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};