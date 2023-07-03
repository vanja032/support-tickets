export const Regex = {
    fNameRegex: /^[a-zA-Z]{1,30}$/,
    LNameRegex: /^[a-zA-Z]{1,50}$/,
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    usernameRegex: /^[a-z0-9._]{8,30}$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}$/
};