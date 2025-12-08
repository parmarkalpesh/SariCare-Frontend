export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const isValidMobile = (mobile) => {
    const re = /^\d{10}$/;
    return re.test(String(mobile));
};

export const isValidPassword = (password) => {
    return password.length >= 6;
};

export const isNotEmpty = (value) => {
    return value.trim().length > 0;
};
