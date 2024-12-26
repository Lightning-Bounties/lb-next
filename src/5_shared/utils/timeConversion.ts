const convertToLockedUntilMins = (amount: number, unit: string): number => {
    const multipliers: Record<string, number> = {
        minutes: 1,
        hours: 60,
        days: 1440,
        weeks: 10080,
        months: 43200 // Approximation of a 30-day month
    }

    return amount * (multipliers[unit] ?? 1)
}

export { convertToLockedUntilMins }