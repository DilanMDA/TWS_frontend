import React, { useRef, useState } from "react";
import { Formik, FormikValues, FormikHelpers, FormikProps } from "formik";
import { CreateUser } from "../../../application/models/UserModel";
import signupFormModel from "./signupForm/signupFormModel";
import signupFormValidationSchema from "./signupForm/signupFormValidationSchema";
import signupFormInitialValue from "./signupForm/signupFormInitialValue";
import FormikTextField from "../../../shared/formikFields/FormikTextField";
import { Button } from "../../../shared/Button";
import { CircularProgress } from "../../../shared/Progress";
import { SignUpIcon } from "../../../shared/Icons";
import FormTemplate from "../../../shared/FormTemplate";
import { Box } from "../../../shared/Box";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import UserApi from "../../../apis/UserApi";

const {
    formField: {
        name,
        email,
        password,
        confirmPassword,
        mobileNumber,
        image
    },
} = signupFormModel;

const SignupForm = () => {
    const formikRef = useRef<FormikProps<CreateUser>>(null);
    const [progress, setProgress] = useState(false);
    const [role, setRole] = useState(signupFormInitialValue.role)

    const handleSubmit = async (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>
    ) => {
        setProgress(true)
        const data: CreateUser = { ...values, role };
        const createdUser = await UserApi.createUserAsync(data);
        console.log(createdUser);
    }

    const onFormChange = (formik: FormikProps<FormikValues>) => {
        //console.log(formik);
    };

    return (
        <FormTemplate
            formikRef={formikRef}
            initialValues={signupFormInitialValue}
            validationSchema={signupFormValidationSchema}
            onSubmit={handleSubmit}
            onChange={onFormChange}
        >
            <Box sx={{ padding: 1, marginTop: 2 }}>
                <FormikTextField
                    name={name.name}
                    label={name.label}
                    textFieldProps={{
                        size: "small",
                        fullWidth: true,
                        sx: { marginBottom: 4 },
                    }}
                />
                <FormikTextField
                    name={email.name}
                    label={email.label}
                    textFieldProps={{
                        size: "small",
                        fullWidth: true,
                        sx: { marginBottom: 4 },
                    }}
                />

                <FormikTextField
                    name={password.name}
                    label={password.label}
                    textFieldProps={{
                        size: "small",
                        fullWidth: true,
                        type: "password",
                        sx: { marginBottom: 4 },
                    }}
                />
                <FormikTextField
                    name={confirmPassword.name}
                    label={confirmPassword.label}
                    textFieldProps={{
                        size: "small",
                        fullWidth: true,
                        type: "password",
                        sx: { marginBottom: 4 },
                    }}
                />
                <FormikTextField
                    name={mobileNumber.name}
                    label={mobileNumber.label}
                    textFieldProps={{
                        size: "small",
                        fullWidth: true,
                        sx: { marginBottom: 4 },
                    }}
                />
                <Box sx={{marginLeft:0.5, marginBottom:4}}>
                    <FormControl>
                        <FormLabel id="user-role-radio">I'm a</FormLabel>
                        <RadioGroup
                            aria-labelledby="user-role-radio"
                            name="user-role-radio-buttons-group"
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                        >
                            <FormControlLabel value="teamMember" control={<Radio />} label={"Team Member"} />
                            <FormControlLabel value="projectManager" control={<Radio />} label={"Project Manager"} />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Button
                    disabled={progress}
                    type="submit"
                    fullWidth={true}
                    sx={{ marginBottom: 2 }}
                    variant="contained"
                    endIcon={
                        progress ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : (
                            <SignUpIcon />
                        )
                    }
                >
                    SignUp
                </Button>
            </Box>
        </FormTemplate>
    )
}

export default SignupForm