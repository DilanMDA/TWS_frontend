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

const signupFormInitialValue = {
    [name.name]: name.initialValue,
    [email.name]: email.initialValue,
    [password.name]: password.initialValue,
    [confirmPassword.name]: confirmPassword.initialValue,
    [image.name]: image.initialValue,
    [role.name]: role.initialValue,
    [mobileNumber.name]: mobileNumber.initialValue
};

export default signupFormInitialValue;
