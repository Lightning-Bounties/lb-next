export const validateInternetIdentifier = (internetIdentifier: string): boolean => {
    const re = /\S+@\S+\.\S+/;
    return re.test(internetIdentifier);
};
