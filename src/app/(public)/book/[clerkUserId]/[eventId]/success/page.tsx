import { db } from "@/drizzle/db"
import { clerkClient } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyEventButton } from "@/components/CopyEventButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatEventDescription } from "@/lib/formattes";
import { cn } from "@/lib/utils";

export default async function BookEventPage({
    params: { clerkUserId },
}: {
    params: { clerkUserId: string }
}) {
    const events = await db.query.EventTable.findMany({
        where: ({ clerkUserId: userIdCol, isActive }, { eq, and }) => 
            and(eq(userIdCol, clerkUserId), eq(isActive, true)),
        orderBy: ({ name }, { desc }) => desc(name),
    })

    if (events.length === 0 ) return notFound()
         
        const { fullName } = await clerkClient().users.getUser(clerkUserId)
 
    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-4xl md:text-5xl font-semibold mb-4 text-center">
                {fullName}
            </div>
            <div className="text-muted-foreground mb-6 max-w-sm mx-auto text-center">
                Welcome to the scheduling page. Please follow the instruction to add an 
                event to the calendar.
            </div>
            <div className="grid gap-4 grid-cols-[repeate(auto-fill, minmax(400px, 1fr))]
                ">
                    {events.map(event => (
                        <EventCard key={event.id} {...event} />
                    ))}
            </div>
        </div>
    )
}

type EventCardProps = {
    id: string
    isActive: boolean
    name: string
    description: string | null
    durationInMinutes: number
    clerkUserId: string
}

function EventCard({
    id, 
    isActive,
    name, 
    description, 
    durationInMinutes, 
    clerkUserId
}: EventCardProps) {
    return (
        <Card className={cn("flex flex-col", !isActive && "border-secondary/50")}>
            <CardHeader className={cn(!isActive && "opacity-50")}>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{formatEventDescription(durationInMinutes)}</CardDescription>
            </CardHeader>
            {description != null && (
                <CardContent className={cn(!isActive && "opacity-50")}>
                    {description}
                </CardContent>
            )}
            <CardFooter className="flex justify-end gap-2 mt-auto">
                {isActive && (
                <CopyEventButton 
                    variant="outline" 
                    eventId={id} 
                    clerkUserId={clerkUserId} />
                )}
                <Button asChild>
                    <Link href={`/events/${id}/edit`}>Edit</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}