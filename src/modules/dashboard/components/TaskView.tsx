import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PROJECT_STATUS_ARRAY } from '../../../application/constants/AppConstants'
import { Task } from '../../../application/models/TaskModels'
import { Box } from '../../../shared/Box'
import { Grid } from '../../../shared/Grid'
import { CloseIcon } from '../../../shared/Icons'
import { Paper } from '../../../shared/Paper'
import { Typography } from '../../../shared/Typography'
import TaskApi from '../../../apis/TaskApi';

interface TaskViewProps {
    task?:Task | null
    onClose:()=>void;
    onSave:(task:Task)=>void;
}

const TaskView = ({task, onClose, onSave}:TaskViewProps) => {

    const [status, setStatus] = useState('')

    const handleStatusChange = async (e:any) => {
        const value = e.target.value;
        setStatus(value);
        try{
            if(task){
                const response = await TaskApi.baseCRUDApi.updateAsync(task.id, {status:value})
                onSave(response);
            }
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        if(task?.status) setStatus(task.status)
    },[task])

    return (
        <Paper sx={{ maxWidth: '800px', minWidth: '350px', padding: 1, width:'100%', height:'70vh', overflowY:'auto' }}>
            {task&&(
                <Box>
                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                        <Typography fontSize={20} fontWeight={500}>{task.title}</Typography>
                        <CloseIcon color='error' sx={{cursor:'pointer'}} onClick={onClose} />
                    </Box>
                    <Box sx={{marginTop:1}}>
                        <Grid container spacing={1}>
                            <Grid item xs={9}>
                                <Typography fontSize={14}>{task.description}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Box sx={{display:'flex', alignItems:'center'}}>
                                    <Typography fontSize={14} fontWeight={500} sx={{marginRight:1}}>Status</Typography>
                                    <Select 
                                        labelId="status-select-label"
                                        size='small'
                                        variant='standard'
                                        fullWidth={true}
                                        value={status}
                                        onChange={handleStatusChange}
                                    >
                                        {PROJECT_STATUS_ARRAY.map(s=>(
                                            <MenuItem key={s.value} value={s.value}>{s.title}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Paper>
    )
}

export default TaskView