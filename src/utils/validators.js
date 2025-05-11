export const validateRequired = (value) => {
    return value ? undefined : 'This field is required';
};

export const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value) ? undefined : 'Invalid email address';
};

export const validatePositiveNumber = (value) => {
    return value > 0 ? undefined : 'Value must be a positive number';
};

export const validateBudgetLimit = (value, limit) => {
    return value <= limit ? undefined : `Value must not exceed ${limit}`;
};