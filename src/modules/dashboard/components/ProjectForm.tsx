import React, { useEffect, useRef, useState } from 'react'
import projectForminitialValue from './projectForm/ProjectFormInitialValue'
import projectFormModel from './projectForm/projectFormModel'
import projectFormValidationSchema from './projectForm/projectFormValidationSchema'
import { FormikValues, FormikHelpers, FormikProps } from 'formik';
import { Project, ProjectFormModel } from '../../../application/models/ProjectModels'
import { Paper } from '../../../shared/Paper'
import { Box } from '../../../shared/Box'
import { Typography } from '../../../shared/Typography'
import FormTemplate from '../../../shared/FormTemplate'
import FormikTextField from '../../../shared/formikFields/FormikTextField'
import { CancelButton, SaveButton } from '../../../shared/Button'
import ProjectApi from '../../../apis/ProjectApi'

const {
    formField: {
        title,
        description,
        startDate,
        endDate
    }
} = projectFormModel;

interface ProjectFormProps {
    open: boolean;
    project?: Project | null;
    onCancel: () => void;
    onSave:(project:Project)=>void;
    newProject:boolean;
}

const ProjectForm = ({ open, project, onCancel, newProject, onSave }: ProjectFormProps) => {
    const formikRef = useRef<FormikProps<ProjectFormModel>>(null);
    const [progress, setProgress] = useState(false);

    const handleSubmit = async (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>
    ) => {
        setProgress(true);
        try {
            const data: ProjectFormModel = { ...values }

            let response:Project | null = null; 
            if(newProject){
                response = await ProjectApi.baseCRUDApi.createAsync(data)
            }else if(project){
                response = await ProjectApi.baseCRUDApi.updateAsync(project.id!, data)
            }    
            if(response){
                onSave(response);
            }
            setProgress(false);
            
        } catch (error) {
            console.log(error)
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
        if (project && !newProject) {
            if (formikRef.current) {
                formikRef.current.setFieldValue(
                    title.name,
                    project.title
                )
                formikRef.current.setFieldValue(
                    description.name,
                    project.description
                )
            }
        } else {
            formikRef.current?.resetForm();
        }
    }, [project, open])

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ maxWidth: '400px', minWidth: '350px', padding: 1 }}>
                <Typography fontSize={18} fontWeight={700}>{`${newProject ? 'Add':'Edit'} Project`} </Typography>
                <FormTemplate
                    formikRef={formikRef}
                    initialValues={projectForminitialValue}
                    validationSchema={projectFormValidationSchema}
                    onSubmit={handleSubmit}
                    onChange={onFormChange}
                >
                    <Box sx={{ marginTop: 1 }}>
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
        </Box>
    )
}

export default ProjectForm