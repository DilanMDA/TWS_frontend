import React, {RefObject, ReactElement} from 'react'
import { Box } from './Box'
import { Typography } from './Typography'
import { Formik, Form, FormikValues, FormikHelpers, FormikProps } from 'formik';

export interface FormTemplateProps {
    formikRef:RefObject<FormikProps<any>>;
    initialValues:any;
    onSubmit:(values: FormikValues, actions:FormikHelpers<FormikValues>)=>void;
    validationSchema:any;
    loading?:boolean;
    children:ReactElement | ReactElement[];
    onChange:(formik:FormikProps<FormikValues>)=>void;
}

const FormTemplate = ({formikRef, initialValues, onSubmit, validationSchema, children, onChange}:FormTemplateProps) => {
    return (
        <Formik
            innerRef={formikRef}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {(formik) => {
                onChange(formik)
                return(
                    <Form>
                        {children}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default FormTemplate