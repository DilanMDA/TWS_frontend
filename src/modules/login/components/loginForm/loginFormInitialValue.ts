import loginFormModel from "./loginFormModel";

const {
    formField: { email, password },
} = loginFormModel;

const loginFormInitialValue = {
    [email.name]: email.initialValue,
    [password.name]: password.initialValue,
};

export default loginFormInitialValue;