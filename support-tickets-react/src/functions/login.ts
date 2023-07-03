import { SetStateAction } from "react";
import { Regex } from "../utils/regex";

const LoginValidation = async (username: string, password: string, setUsernameValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, setPasswordValid: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }) => {
    var valid = true;

    /*Username and/or Email validation*/
    if (!Regex.usernameRegex.test(username) && !Regex.emailRegex.test(username)) {
        valid = false;
        setUsernameValid(false);
    }
    else {
        setUsernameValid(true);
    }

    /*Password*/
    if (!Regex.passwordRegex.test(password)) {
        valid = false;
        setPasswordValid(false);
    }
    else {
        setPasswordValid(true);
    }

    return valid;
};

export default LoginValidation;