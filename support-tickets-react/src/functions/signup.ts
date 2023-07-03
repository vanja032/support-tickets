import { SetStateAction } from "react";
import { Regex } from "../utils/regex";

const SignupValidation = async (f_name: string, l_name: string, email: string, username: string, password: string, r_password: string, 
    setFNameValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },
    setLNameValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },
    setEmailValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },
    setUsernameValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, 
    setPasswordValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; },
    setRPasswordValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {

    var valid = true;

    /*First name validation*/
    if (!Regex.fNameRegex.test(f_name)) {
        valid = false;
        setFNameValid(false);
    }
    else {
        setFNameValid(true);
    }

    /*Last name validation*/
    if (!Regex.LNameRegex.test(l_name)) {
        valid = false;
        setLNameValid(false);
    }
    else {
        setLNameValid(true);
    }

    /*Email validation*/
    if (!Regex.emailRegex.test(email)) {
        valid = false;
        setEmailValid(false);
    }
    else {
        setEmailValid(true);
    }

    /*Username validation*/
    if (!Regex.usernameRegex.test(username)) {
        valid = false;
        setUsernameValid(false);
    }
    else {
        setUsernameValid(true);
    }

    /*Password validation*/
    if (!Regex.passwordRegex.test(password)) {
        valid = false;
        setPasswordValid(false);
    }
    else {
        setPasswordValid(true);
    }

    /*Repeated Password validation*/
    if (!Regex.passwordRegex.test(r_password) || password.localeCompare(r_password)) {
        valid = false;
        setRPasswordValid(false);
    }
    else {
        setRPasswordValid(true);
    }

    return valid;
};

export default SignupValidation;