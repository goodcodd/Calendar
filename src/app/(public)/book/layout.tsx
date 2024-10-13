import { ReactNode } from "react";
// Import ReactNode type for type-checking children props

// Define a functional component named PublicLayout that takes children nodes as props
export default function PublicLayout({children}: {children: ReactNode}) {
    return (
        <main className="container my-6">{children}</main>
    )
}