const convertToLockedUntilMins = (amount: number, unit: string): number => {
    const multipliers: Record<string, number> = {
        minutes: 1,
        hours: 60,
        days: 1440,
        weeks: 10080,
        months: 43200, // Approximation of a 30-day month
    };

    return amount * (multipliers[unit] ?? 1);
};

const convertToUnlocksAtTimestamp = (amount: number, unit: string): string => {
    const totalMinutes = convertToLockedUntilMins(amount, unit);
    const now = new Date();
    const future = new Date(now.getTime() + totalMinutes * 60_000); // convert minutes to ms
    return future.toISOString(); // Return ISO string: "2025-01-08T02:22:26.720Z"
};

export { convertToUnlocksAtTimestamp };
