import React from 'react';
import { useField } from 'formik';
import { TextField } from '../TextField';
import { BaseTextFieldProps, GridProps } from '@mui/material';
import { Grid } from '../Grid';

export interface FormikTextFieldProps {
    label?:string;
    name:string;
    textFieldProps?:BaseTextFieldProps;
    grid?:boolean;
    gridProps?:GridProps;
}

const FormikTextField = ({label, name, textFieldProps, grid, gridProps}:FormikTextFieldProps) => {
    const [field, meta, helper] = useField(name);

    const isError = () => {
        if(meta.touched && meta.error) return true;
        return false;
    }

    const renderHelperText = ()=>{
        if(meta.error && meta.touched) {
            return meta.error;
        }
        return '';
    }

    if(grid) return (
        <Grid item {...gridProps}>
            <TextField 
                label={label}
                {...textFieldProps}
                error={isError()}
                helperText={renderHelperText()}
                {...field}
            />
        </Grid>
    )

    return (
        <TextField 
            label={label}
            {...textFieldProps}
            error={isError()}
            helperText={renderHelperText()}
            {...field}
        />
    )
}

export default FormikTextField