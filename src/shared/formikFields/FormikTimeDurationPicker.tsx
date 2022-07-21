import React from 'react'
import { useField } from 'formik';
import { BaseTextFieldProps, GridProps } from '@mui/material';
import CustomTimeDurationPicker from '../CustomTimeDurationPicker';
import { Grid } from '../Grid';


export interface FormikTimeDurationPickerProps {
    label?:string;
    name:string;
    textFieldProps?:BaseTextFieldProps;
    grid?:boolean;
    gridProps?:GridProps;
    readOnly?:boolean
}

const FormikTimeDurationPicker = ({
    label, name, textFieldProps, grid, gridProps, readOnly
}:FormikTimeDurationPickerProps) => {
    const [field, meta, helper] = useField(name);
    const { setValue } = helper;

    const handleChange = (time:number) => {
        if(!readOnly) setValue(time);
    }

    const isError = () => {
        if(meta.touched && meta.error) return true;
        return false;
    }

    const renderHelperText = ()=>{
        if(meta.error && meta.touched) {
            return meta.error;
        }
    }

    if(grid) return (
        <Grid item {...gridProps}>
            <CustomTimeDurationPicker
                textFieldProps={textFieldProps}
                minutes={field.value}
                onChange={handleChange}
            />
        </Grid>
    )

    return (
        <CustomTimeDurationPicker
            textFieldProps={textFieldProps}
            minutes={field.value}
            onChange={handleChange}
        />
    )
}

export default FormikTimeDurationPicker