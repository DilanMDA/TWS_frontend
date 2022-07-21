import * as yup from "yup";
import loginFormModel from "./loginFormModel";

const {
    formField: { email, password },
} = loginFormModel;

const loginFormvalidationSchema = yup.object().shape({
    [password.name]: yup
        .string()
        .required(password.requiredErrorMsg)
        .min(6, password.minCharacterError)
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    [email.name]: yup
        .string()
        .email("Must be a valid email")
        .required(email.requiredErrorMsg),
});

export default loginFormvalidationSchema;
