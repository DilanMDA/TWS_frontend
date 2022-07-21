import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box } from "../../../shared/Box";
import { FormikValues, FormikHelpers, FormikProps } from 'formik';
import loginFormModel from "./loginForm/loginFormModel";
import loginFormInitialValue from "./loginForm/loginFormInitialValue";
import loginFormvalidationSchema from "./loginForm/loginFormValidation";
import FormTemplate from '../../../shared/FormTemplate';
import FormikTextField from '../../../shared/formikFields/FormikTextField';
import { Button } from '../../../shared/Button';
import { CircularProgress } from '../../../shared/Progress';
import { LoginIcon } from '../../../shared/Icons';
import { CreateSession, SessionResponse } from '../../../application/models/SessionModels';
import { setCookie } from '../../../utils/CookieAccess';
import { setAuthHeader } from '../../../apis/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../../application/constants/AppRoutes';
import SessionApi from '../../../apis/SessionApi';
import { AuthContext } from '../../../auth/AuthProvider';

const {
    formField: { email, password },
} = loginFormModel;


const LoginForm = () => {
    const navigate = useNavigate();
    const formikRef = useRef<FormikProps<CreateSession>>(null);
    const [progress, setProgress] = useState(false);
    const authContext = useContext(AuthContext);

    const handleSubmit = async (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>
    ) => {
        setProgress(true);
        const data:CreateSession = {...values};
        try{
            const sessionResponse = await SessionApi.createSessionAsync(data);
            handleLogin(sessionResponse);
        }catch(error){
            console.log(error)
        }
    }

    const handleLogin = (sessionResponse: SessionResponse) => {
        setCookie("access-token", sessionResponse.accessToken, 1);
        setCookie("refresh-token", sessionResponse.refreshToken, 90);
        setAuthHeader(sessionResponse.accessToken);
        if(authContext){
            authContext.setAuth({
                loading:false,
                authenticated:true
            })
        }
    }

    const onFormChange = (formik: FormikProps<FormikValues>) => {
        //console.log(formik);
    }

    useEffect(()=>{
        if(authContext && authContext.auth.authenticated){
            navigate("/", {replace:true});
        }
    },[authContext])

    return (
        <FormTemplate
            formikRef={formikRef}
            initialValues={loginFormInitialValue}
            validationSchema={loginFormvalidationSchema}
            onSubmit={handleSubmit}
            onChange={onFormChange}
        >
            <Box sx={{ padding: 1, marginTop: 2 }}>
                <FormikTextField
                    name={email.name}
                    label={email.label}
                    textFieldProps={{ size: 'small', fullWidth: true, sx: { marginBottom: 4 } }}
                />
                <FormikTextField
                    name={password.name}
                    label={password.label}
                    textFieldProps={{ size: 'small', fullWidth: true, type: 'password', sx: { marginBottom: 4 } }}
                />
                <Button
                    disabled={progress}
                    type='submit'
                    fullWidth={true}
                    sx={{marginBottom:2}}
                    variant='contained'
                    endIcon={progress ? (<CircularProgress color='inherit' size={20} />) : (<LoginIcon />)}
                >
                    Login
                </Button>
            </Box>
        </FormTemplate>
    )
};

export default LoginForm;
