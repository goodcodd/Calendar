// Function to format the duration of an event in a readable form
export function formatEventDescription(durationInMinutes: number) { 
    const hours = Math.floor(durationInMinutes / 60)  // Calculate the number of whole hours
    const minutes = durationInMinutes % 60
    const minutesString = `${minutes} ${minutes > 1 ? "mins" : "min"}`
    const hoursString = `${hours} ${hours > 1 ? "hrs" : "hr"}`

    if (hours === 0) return minutesString // Return just minutes if no hours
    if (minutes === 0) return hoursString // Return just hours if no minutes
    return `${hoursString} ${minutesString}`// Combine hours and minutes for full duration
}

export function formatTimeZoneOffset(timezone: string) {
    return new Intl.DateTimeFormat(undefined, {
        timeZone: timezone,
        timeZoneName: "shortOffset",
    }).formatToParts(new Date()).find(part => part.type == 
        "timeZoneName")?.value
    // Use Intl.DateTimeFormat to format current date in specified timezone,
    // then extract and return the timezone offset part.
}