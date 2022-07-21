import React, { useEffect, useState } from 'react'
import { Team, TeamDataResponse } from '../../../application/models/Team.models';
import { User } from '../../../application/models/UserModel';
import { Box } from '../../../shared/Box';
import { Button } from '../../../shared/Button';
import { Grid } from '../../../shared/Grid';
import { AddIcon, CloseIcon } from '../../../shared/Icons';
import { Paper } from '../../../shared/Paper';
import { TextField } from '../../../shared/TextField';
import { Typography } from '../../../shared/Typography';
import UserApi from '../../../apis/UserApi'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import TeamApi from '../../../apis/TeamApi';
import { Task } from '../../../application/models/TaskModels';
import { Collapse } from '../../../shared/Collapse';

interface TeamViewProps {
    team?:Team | null;
    onClose:()=>void;
    openForm:()=>void;
    tasks:Task[];
    userRole:string;
}

const TeamView = ({userRole,onClose, openForm, team, tasks}:TeamViewProps) => {
    const [addTeamMember, setAddTeamMember] = useState(false);
    const [pickedUser, setPickedUser] = useState<User|null>(null);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [designation, setDesignation] = useState('');
    const [teamData, setTeamData] = useState<TeamDataResponse|null>(null);
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if(search.length > 2){
            UserApi.searchUserAsync(search).then((response)=>{
                setUsers(response.rows);
            })
        }else{
            setUsers([]);
        }
    }, [search])
    
    const addUser = async()=>{
        try{
            const response = await TeamApi.addTeamMemberAsync(team?.id!, {
                userId:pickedUser?.id!,
                designation
            })
            
            setAddTeamMember(false);
            setUserId('');
            if(team){
                TeamApi.getTeamDataAsync(team.id)
                .then(response => {
                    setTeamData(response)
                })
            }
            
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        if(team){
            TeamApi.getTeamDataAsync(team.id)
            .then(response => {
                setTeamData(response)
            })
        }
    },[team])

    return (
        <Paper sx={{ maxWidth: '600px', minWidth: '350px', padding: 1, width:'100%', maxHeight:'700px', overflowY:'auto' }}>
            {team&&(
                <Box>
                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                        <Typography fontSize={17} fontWeight={700}>{team.title}</Typography>
                        <CloseIcon color='error' sx={{cursor:'pointer'}} onClick={onClose} />
                    </Box>
                    <Typography fontSize={12} fontWeight={400}>{team.description}</Typography>
                    {(userRole && userRole !== 'teamMember') && (
                        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                            {addTeamMember||(
                                <Button size='small' variant='outlined' startIcon={<AddIcon />} onClick={()=>setAddTeamMember(true)}>Add Team Member</Button>
                            )}
                        </Box>
                    )}
                    {addTeamMember?(
                        <Box>
                            {!pickedUser?(
                                <>
                                    <TextField 
                                        value={search}
                                        onChange={(e)=>setSearch(e.target.value)}
                                        variant='standard'
                                        fullWidth={true}
                                        placeholder='Search User By Email / Username'
                                    />
                                    <Box>
                                        <Table
                                            size='small'
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Username</TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    users.map(u=>(
                                                        <TableRow key={u.id}>
                                                            <TableCell>{u.name}</TableCell>
                                                            <TableCell>{u.email}</TableCell>
                                                            <TableCell>
                                                                <Button size='small' sx={{padding:0}} onClick={()=>setPickedUser(u)}>Choose</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </Box>
                                </>
                            ):(
                                <Box sx={{display:'flex', alignItems:'flex-end', justifyContent:'flex-end'}}>
                                    <Typography fontSize={16} fontWeight={600} sx={{marginRight:1}} >{`${pickedUser.name}, ${pickedUser.email} `}</Typography>
                                    <TextField 
                                        size='small'
                                        placeholder="Designation"
                                        value={designation}
                                        variant='standard'
                                        onChange={(e)=>setDesignation(e.target.value)}
                                    />
                                    <Button size='small' onClick={addUser}>Add</Button>
                                    <Button size='small' onClick={()=>{setPickedUser(null); setAddTeamMember(false)}}>Cancel</Button>
                                </Box>
                            )}
                        </Box>
                    ):(
                        <Box>
                            {teamData&&(
                                <Table
                                    size="small"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell sx={{display:'flex', justifyContent:'flex-end'}}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teamData.teamMembers.map(m => (
                                            <>
                                                <TableRow key={m.id}>
                                                    <TableCell>{m.user.name}</TableCell>
                                                    <TableCell>{m.user.email}</TableCell>
                                                    <TableCell sx={{display:'flex', justifyContent:'flex-end'}}>
                                                        <Button size='small' sx={{padding:0}} onClick={()=>setUserId(m.userId)}>View Tasks</Button>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow key={`collapse-${m.id}`}>
                                                    <TableCell colSpan={3}>
                                                        <Collapse
                                                            in={userId === m.userId}
                                                        >
                                                            <Box sx={{padding:0.2}}>
                                                                {tasks.filter(t => t.assigneeId === userId).map(t => (
                                                                    <Paper sx={{padding:0.5, marginTop:0.5}}>
                                                                        <Typography fontSize={12}>{t.title}</Typography>
                                                                        <Typography fontSize={10}>{t.status}</Typography>
                                                                    </Paper>
                                                                ))}
                                                            </Box>
                                                        </Collapse>
                                                    </TableCell>
                                                </TableRow>
                                            </>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </Box>
                    )}
                </Box>
            )}
        </Paper>
    )
}

export default TeamView