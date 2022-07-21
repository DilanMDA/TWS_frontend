const loginFormModel = {
    formId: "quarryForm",
    formField:{
        email: {
            name: "email",
            label: "Email",
            initialValue: "",
            requiredErrorMsg: "Email is required.",
        },
        password: {
            name: "password",
            label: "Password",
            initialValue: "",
            requiredErrorMsg: "Password is required.",
            minCharacterError: "Password is too short - should be 6 chars minimum.",
        },
    },
};

export default loginFormModel;
