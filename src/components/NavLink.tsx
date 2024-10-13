"use client" // this file should run on the client side
 
import { cn } from "@/lib/utils" // Import a utility function for class name merging
import Link from "next/link" // Import Next.js's Link component for client-side navigation
import { usePathname } from "next/navigation"
import { ComponentProps } from "react"

export function NavLink({ className, ...props }: ComponentProps<typeof Link>) {
    const path = usePathname()
    const isActive = path === props.href
    return (
        <Link 
            {...props}
            className={cn(
                "transition-colors",
                isActive 
                ? "text-foreground"
                : "text-mutes-foreground hover:text-foreground",
                className 
            )}
        />
    )
}