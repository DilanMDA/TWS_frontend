import React, { useContext, useEffect, useRef, useState } from 'react'
import taskFormModel from './taskForm/taskFormModel'
import taskFormInitialValue from './taskForm/taskForminitialValue'
import taskFormValidationSchema from './taskForm/taskFormValidationSchema'
import { FormikValues, FormikHelpers, FormikProps } from 'formik';
import { Task, TaskFormModel } from '../../../application/models/TaskModels';
import FormTemplate from '../../../shared/FormTemplate';
import FormikTextField from '../../../shared/formikFields/FormikTextField';
import { CancelButton, SaveButton } from '../../../shared/Button';
import { Paper } from '../../../shared/Paper';
import { Typography } from '../../../shared/Typography';
import { Box } from '../../../shared/Box';
import TaskApi from '../../../apis/TaskApi';
import { AuthContext } from '../../../auth/AuthProvider';

const {
    formField:{
        title,
        description,
        timeAllocation,
        urgency,
        status
    }
} = taskFormModel;

interface TaskFormProps {
    open:boolean;
    task?:Task | null;
    projectId:string;
    onCancel: () => void;
    onSave:(task:Task)=>void;
}

const TaskForm = ({open, task, projectId, onCancel, onSave}:TaskFormProps) => {
    const formikRef = useRef<FormikProps<TaskFormModel>>(null);
    const [progress, setProgress] = useState(false);

    const handleSubmit = async (
        values: FormikValues,
        actions: FormikHelpers<FormikValues>
    ) => {
        setProgress(true);
        try{
            const data:TaskFormModel = {...values};
            let response:Task|null = null;
            if(task){
                response = await TaskApi.baseCRUDApi.updateAsync(task.id, data);
            }else{
                response = await TaskApi.baseCRUDApi.createAsync({...data, projectId})
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

    useEffect(()=>{
        if(task){

        }else{
            formikRef.current?.resetForm();
        }
    },[task, open])

    return (
        <Paper sx={{ maxWidth: '400px', minWidth: '350px', padding: 1 }}>
            <Typography fontSize={18} fontWeight={700}>Task</Typography>
            <FormTemplate
                formikRef={formikRef}
                initialValues={taskFormInitialValue}
                validationSchema={taskFormValidationSchema}
                onSubmit={handleSubmit}
                onChange={onFormChange}
            >
                <Box sx={{marginTop:1}} >
                    <FormikTextField
                        name={title.name}
                        label={title.label}
                        textFieldProps={{ size: 'small', fullWidth: true, sx: { marginBottom: 2 } }}
                    />
                    <FormikTextField
                        name={timeAllocation.name}
                        label={timeAllocation.label}
                        textFieldProps={{ size: 'small', type:'number',fullWidth: true, sx: { marginBottom: 2 } }}
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

export default TaskForm