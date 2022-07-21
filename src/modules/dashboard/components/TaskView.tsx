import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PROJECT_STATUS_ARRAY, PROJECT_URGENCY_ARRAY } from '../../../application/constants/AppConstants'
import { Task } from '../../../application/models/TaskModels'
import { Box } from '../../../shared/Box'
import { Grid } from '../../../shared/Grid'
import { CloseIcon, EditIcon } from '../../../shared/Icons'
import { Paper } from '../../../shared/Paper'
import { Typography } from '../../../shared/Typography'
import TaskApi from '../../../apis/TaskApi';
import { getDuration } from '../../../shared/CustomTimeDurationPicker'
import { Button } from '../../../shared/Button'
import { Team, TeamDataResponse } from '../../../application/models/Team.models'
import TeamApi from '../../../apis/TeamApi';

interface TaskViewProps {
    task?:Task | null
    onClose:()=>void;
    onSave:(task:Task)=>void;
    openForm:()=>void;
    teams:Team[];
    userRole:string
}

const TaskView = ({task, teams, onClose, onSave, openForm, userRole}:TaskViewProps) => {

    const [status, setStatus] = useState('')
    const [urgency, setUrgency] = useState('')
    const [taskData, setTaskData] = useState<Task|null>(null);
    const [editAssignee, setEditAssignee] = useState(false);
    const [teamId, setTeamId] = useState('');
    const [teamData, setTeamData] = useState<TeamDataResponse|null>(null);
    const [assigneeId, setAssigneeId] = useState('');

    const getTaskData = async() => {
        try{
            if(task){
                const response = await TaskApi.baseCRUDApi.getAsync(task.id)
                setTaskData(response)
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleAssigneeChange = async() => {
        try{
            if(task){
                const response = await TaskApi.baseCRUDApi.updateAsync(task.id, {assigneeId})
                onSave(response)
                setAssigneeId('')
                setEditAssignee(false);
                setTeamId('')
                setTeamData(null)
            }
        }catch(e){
            console.log(e)
        }
    }

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

    const handleUrgencyChange = async (e:any) => {
        const value = e.target.value;
        setUrgency(value);
        try{
            if(task){
                const response = await TaskApi.baseCRUDApi.updateAsync(task.id, {urgency:value})
                onSave(response);
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        if(task?.status) setStatus(task.status)
        if(task?.urgency) setUrgency(task.urgency)
        if(task) getTaskData()
    },[task])

    useEffect(()=>{
        setAssigneeId('')
        setTeamData(null)
        if(teamId){
            TeamApi.getTeamDataAsync(teamId)
            .then(response => {
                setTeamData(response)
            })
        }
    },[teamId])

    return (
        <Paper sx={{ maxWidth: '600px', minWidth: '350px', padding: 1, width:'100%' }}>
            {task&&(
                <Box>
                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                        <Typography fontSize={17} fontWeight={500}>{task.title}</Typography>
                        <CloseIcon color='error' sx={{cursor:'pointer'}} onClick={onClose} />
                    </Box>
                    <Box sx={{display:'flex', marginTop:1}}>
                        <Box sx={{width:'70%'}}>
                            <Typography fontSize={14} sx={{marginBottom:1}}>{task.description}</Typography>
                            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:0.5}}>
                                <Typography fontSize={14} fontWeight={500} sx={{marginRight:1}}>Allocated Time: {`${getDuration(task.timeAllocation)}`}</Typography>
                            </Box>
                            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:0.5}}>
                                <Typography fontSize={14} fontWeight={500} sx={{marginRight:1}}>Status</Typography>
                                <Select 
                                    labelId="status-select-label"
                                    size='small'
                                    variant='standard'
                                    value={status}
                                    onChange={handleStatusChange}
                                >
                                    {PROJECT_STATUS_ARRAY.map(s=>(
                                        <MenuItem key={s.value} value={s.value}>{s.title}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:0.5}}>
                                <Typography fontSize={14} fontWeight={500} sx={{marginRight:1}}>Urgency</Typography>
                                <Select 
                                    labelId="status-select-label"
                                    size='small'
                                    variant='standard'
                                    value={urgency}
                                    onChange={handleUrgencyChange}
                                >
                                    {PROJECT_URGENCY_ARRAY.map(u=>(
                                        <MenuItem key={u.value} value={u.value}>{u.title}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            {(userRole && userRole !== 'teamMember') && (
                                <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                    <Button size='small' startIcon={<EditIcon />} onClick={openForm}>Edit</Button>
                                </Box>
                            )}
                        </Box>
                        <Box sx={{width:'30%'}}>
                            <Box sx={{paddingX:1}}>
                                {taskData && taskData.reporter && (
                                    <Box>
                                        <Typography fontSize={12}>Reporter</Typography>
                                        <Typography fontSize={14} fontWeight={700}>{taskData.reporter.name}</Typography>
                                    </Box>
                                )}
                                <Box sx={{marginTop:1}}>
                                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <Typography fontSize={12}>Assignee</Typography>
                                        {!editAssignee&&(
                                            <EditIcon color='primary' sx={{fontSize:'14px', cursor:'pointer'}} onClick={()=>setEditAssignee(true)} />
                                        )}
                                    </Box>
                                    {taskData && taskData.assignee && (
                                        <Typography fontSize={14} fontWeight={700}>{taskData.assignee.name}</Typography>
                                    )}
                                    {editAssignee&&(
                                        <Box sx={{marginTop:1}}>
                                            <Box>
                                                <FormControl size='small' fullWidth={true}>
                                                    <InputLabel id="demo-simple-select-label">Team</InputLabel>
                                                    <Select
                                                        size='small'    
                                                        fullWidth={true}
                                                        label="Team"
                                                        value={teamId}
                                                        onChange={(e)=>setTeamId(e.target.value)}
                                                    >
                                                        {teams.map(t=>(
                                                            <MenuItem key={t.id} value={t.id}>{t.title}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            {teamData&&(
                                                <Box sx={{marginTop:1}}>
                                                    <FormControl size='small' fullWidth={true}>
                                                        <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                                                        <Select
                                                            size='small'    
                                                            fullWidth={true}
                                                            label="Assignee"
                                                            value={assigneeId}
                                                            onChange={(e)=>setAssigneeId(e.target.value)}
                                                        >
                                                            {teamData.teamMembers.map(u => (
                                                                <MenuItem key={u.userId} value={u.userId}>{u.user.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            )}
                                            <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                                <Button size={'small'} disabled={!assigneeId} onClick={handleAssigneeChange}>Save</Button>

                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    
                </Box>
            )}
        </Paper>
    )
}

export default TaskView