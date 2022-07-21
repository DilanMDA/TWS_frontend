import * as yup from "yup";
import signupFormModel from "./signupFormModel";

const {
    formField: {
        name,
        email,
        password,
        confirmPassword,
        mobileNumber,
        image,
        role,
    },
} = signupFormModel;

const signupFormValidationSchema = yup.object().shape({
    [name.name]: yup.string().required(name.requiredErrorMsg),
    [email.name]: yup
        .string()
        .email("Must Valid Email")
        .required(email.requiredErrorMsg),
    [password.name]: yup
        .string()
        .required(password.requiredErrorMsg)
        .min(6, password.minCharacterError)
        .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters."),
    [confirmPassword.name]: yup
        .string()
        .required(confirmPassword.requiredErrorMsg)
        .test("password-match", "Password must match", function (value) {
            return this.parent.password === value;
        }),
    [mobileNumber.name]: yup.string(),
});

export default signupFormValidationSchema;
