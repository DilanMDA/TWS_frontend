import React, { useEffect, useRef, useState } from 'react'
import teamFormModel from './teamForm/teamFormModel'
import teamFormValidationSchema from './teamForm/teamFormValidationSchema'
import teamFormInitialValue from './teamForm/teamFormInitialValue'
import { FormikValues, FormikHelpers, FormikProps } from 'formik';
import FormTemplate from '../../../shared/FormTemplate';
import FormikTextField from '../../../shared/formikFields/FormikTextField';
import { CancelButton, SaveButton } from '../../../shared/Button';
import { Team, TeamFormModel } from '../../../application/models/Team.models';
import { Paper } from '../../../shared/Paper';
import { Typography } from '../../../shared/Typography';
import { Box } from '../../../shared/Box';
import TeamApi from '../../../apis/TeamApi';

const {
    formField: {
        title,
        description,
    }
} = teamFormModel;

interface TeamFormProps {
    open?: boolean;
    team?: Team | null;
    projectId: string;
    onCancel: () => void;
    onSave: (team: Team) => void;
}

const TeamForm = ({ team, open, projectId, onCancel, onSave }: TeamFormProps) => {
    const formikRef = useRef<FormikProps<TeamFormModel>>(null);
    const [progress, setProgress] = useState(false);

    const handleSubmit = async (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>
    ) => {
        setProgress(true);
        try{
            const data:TeamFormModel = {...values};
            let response:Team|null = null;
            if(team){
                response = await TeamApi.baseCRUDApi.updateAsync(team.id, data);
            }else{
                response = await TeamApi.baseCRUDApi.createAsync({...data, projectId});
            }
            onSave(response)
        }catch(error){
            console.log(error);
            setProgress(false);
        }
    }

    const onFormChange = (formik: FormikProps<FormikValues>) => {
        //console.log(formik);
    }

    const handleCancel = () => {
        onCancel();
    }

    useEffect(() => {
        if (team) {

        } else {
            formikRef.current?.resetForm();
        }
    }, [team])

    return (
        <Paper sx={{ maxWidth: '400px', minWidth: '350px', padding: 1 }}>
            <Typography fontSize={18} fontWeight={700}>Team</Typography>
            <FormTemplate
                formikRef={formikRef}
                initialValues={teamFormInitialValue}
                validationSchema={teamFormValidationSchema}
                onSubmit={handleSubmit}
                onChange={onFormChange}
            >
                <Box sx={{ marginTop: 1 }} >
                    <FormikTextField
                        name={title.name}
                        label={title.label}
                        textFieldProps={{ size: 'small', fullWidth: true, sx: { marginBottom: 2 } }}
                    />
                    <FormikTextField
                        name={description.name}
                        label={description.label}
                        textFieldProps={{
                            size: 'small', fullWidth: true, sx: { marginBottom: 2 }, multiline: true,
                            rows: 2
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <SaveButton
                            progress={progress}
                            label='Save'
                            buttonProps={{ size: 'small', sx: { marginRight: 1 } }}
                        />
                        <CancelButton
                            progress={progress}
                            label='Cancel'
                            buttonProps={{ size: 'small', onClick: handleCancel }}
                        />
                    </Box>
                </Box>
            </FormTemplate>
        </Paper>
    )
}

export default TeamForm