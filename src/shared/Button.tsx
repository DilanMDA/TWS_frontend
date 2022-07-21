import { Button as MUIButton, ButtonProps } from "@mui/material";
import styled from "styled-components";
import { CancelIcon, SaveIcon } from "./Icons";
import { CircularProgress } from "./Progress";

export const Button = styled(MUIButton)``

export const SaveButton = ({label, buttonProps, progress}:{label:string, buttonProps?:ButtonProps, progress?:boolean}) => {
    return (
        <Button
            type='submit'
            variant="contained"
            disabled={progress}
            startIcon={progress?<CircularProgress color='inherit' size={20} />:<SaveIcon />}
            {...buttonProps}
        >{label}</Button>
    )
}

export const CancelButton = ({label, buttonProps, progress}:{label:string, buttonProps?:ButtonProps, progress?:boolean}) => {
    return (
        <Button
            type='reset'
            variant="outlined"
            disabled={progress}
            startIcon={<CancelIcon />}
            {...buttonProps}
        >{label}</Button>
    )
}