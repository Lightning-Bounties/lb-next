const catchHTTPValidationError = (error: any) => {
    if (error.statusText !== undefined) {
        return error.statusText;
    } else {
        return 'Error';
    }
};

export { catchHTTPValidationError };
