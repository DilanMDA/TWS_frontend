import { FormControlLabel, FormGroup, IconButton, Switch } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Project } from '../../application/models/ProjectModels'
import { Box } from '../../shared/Box'
import { Divider } from '../../shared/Divider'
import { Grid } from '../../shared/Grid'
import { AddIcon, ArrowRightIcon, EditIcon } from '../../shared/Icons'
import { Typography } from '../../shared/Typography'
import ProjectApi from '../../apis/ProjectApi'
import ProjectForm from './components/ProjectForm'
import { AuthContext } from '../../auth/AuthProvider'
import { Button } from '../../shared/Button'
import { Modal } from '../../shared/Modal'
import { grey } from '@mui/material/colors'
import { Paper } from '../../shared/Paper'
import { DATE_FORMAT, PROJECT_STATUS_ARRAY } from '../../application/constants/AppConstants'
import { Task } from '../../application/models/TaskModels'
import TaskForm from './components/TaskForm'
import TaskView from './components/TaskView'
import { Team } from '../../application/models/Team.models'
import TeamForm from './components/TeamForm'
import TeamView from './components/TeamView'
import moment from 'moment'
import { BaseFetchModel } from '../../apis/BaseApi'

const TaskContainer = ({children, label}:{children:any, label:string}) => {
    return(
        <Grid item xs={2}>
            <Box sx={{minHeight:'70vh', backgroundColor:grey['200'], borderRadius:1, paddingY:1, paddingX:0.5}}>
                <Paper>
                    <Typography fontSize={14} fontWeight={700} textAlign='center'>{label}</Typography>
                </Paper>
                {children}
            </Box>
        </Grid>
    )
}

const Dashboard = () => {

    const [myProjects, setMyProjects] = useState<Project[]>([])
    const [openProjectForm, setOpenProjectForm]  = useState(false);
    const [selectedProject, setSelectedProject] = useState<null | Project>(null)
    const [newProject, setNewProject] = useState(false);
    const authContext = useContext(AuthContext);
    const [projectTasks, setProjectTasks] = useState<Task[]>([]);
    const [openTaskForm, setOpenTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task|null>(null);
    const [projectTeams, setProjectTeams] = useState<Team[]>([]);
    const [selectedTeam, setSelectedTeam] = useState<Team|null>(null);
    const [openTeamForm, setOpenTeamForm] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [myTaskOnly, setMyTaskOnly] = useState(false);

    const getMyProjects = async()=>{
        try{
            let response:BaseFetchModel<Project> | null = null;
            if(userRole === 'projectManager'){
                response = await ProjectApi.getMyProjectsAsync();
            }else{
                response = await ProjectApi.getTeamMemberProjectsAsync();
            }
            setMyProjects(response.rows);
            if(response.count > 0){
                setSelectedProject(response.rows[0])
            }
        }catch(error){
            console.log(error)
        }
    }

    const getProjectTasks = async () => {
        try{
            if(selectedProject){
                const response = await ProjectApi.getProjectTasksAsync(selectedProject.id!)
                setProjectTasks(response);
            }
        }catch(error){
            console.log(error)
        }
    }

    const getProjectTeams = async () => {
        try{
            if(selectedProject){
                const response = await ProjectApi.getProjectTeamsAsync(selectedProject.id!)
                setProjectTeams(response);
            }
        }catch(error){
            console.log(error)
        }
    }

    const filterTasks = (status:string)=>{
        let userId = ''
        let currentTasks = [...projectTasks]
        if(authContext){
            userId = authContext.auth.user?.id??''
        }
        if(myTaskOnly){
            currentTasks = currentTasks.filter(t => t.assigneeId === userId);
        }
        return currentTasks.filter(t => t.status === status)
    }

    const handleCancelProjectForm = ()=>{
        setOpenProjectForm(false);
        setNewProject(false);
    }

    const handleCancelTaskForm = () => {
        setOpenTaskForm(false);
        setSelectedTask(null);
    }

    const handleCancelTeamForm = () => {
        setOpenTeamForm(false);
        setSelectedTeam(null);
    }

    const handleSaveTaskForm = (task:Task) => {
        if(!selectedTask){
            setProjectTasks([...projectTasks, task])
        }else{
            setProjectTasks(
                projectTasks.map(t => {
                    if(t.id === task.id) return task;
                    return t
                })
            )
        }
        setSelectedTask(task);
        setOpenTaskForm(false);
    }

    const handleSaveTeamForm = (team:Team) => {
        if(!selectedTeam){
            setProjectTeams([...projectTeams, team])
        }else{
            setProjectTeams(
                projectTeams.map(t => {
                    if(t.id === team.id) return team;
                    return t
                })
            )
        }
        setSelectedTeam(team);
        setOpenTeamForm(false);
    }

    const handleSaveProjectForm = (project:Project)=>{
        setSelectedProject(project);
        if(newProject){
            setMyProjects([project, ...myProjects]);
        }else{
            setMyProjects(myProjects.map(p => {
                if(p.id === project.id){
                    return project
                }
                return p
            }))
        }
        handleCancelProjectForm();
    }

    const handleCloseTaskView = ()=>{
        setSelectedTask(null);
    }

    const handleCloseTeamView = ()=>{
        setSelectedTeam(null);
    }


    useEffect(()=>{
        if(authContext && authContext.auth.authenticated){
            setUserRole(authContext.auth.user?.role??'')
        }
    },[authContext])

    useEffect(()=>{
        if(userRole){
            getMyProjects();
        }
    },[userRole])

    useEffect(()=>{
        if(selectedProject){
            getProjectTasks();
            getProjectTeams(); 
        }
    },[selectedProject])

    return (
        <>
            <Modal open={openTeamForm || Boolean(selectedTeam)}>
                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {selectedTeam && !openTeamForm ? (
                        <TeamView userRole={userRole} tasks={projectTasks} openForm={()=>setOpenTeamForm(true)} team={selectedTeam} onClose={handleCloseTeamView} />
                    ):(
                        <TeamForm onCancel={handleCancelTeamForm} onSave={handleSaveTeamForm} team={selectedTeam} open={openTeamForm} projectId={selectedProject ? selectedProject.id:''} />
                    )}
                </Box>
            </Modal>
            <Modal open={openTaskForm || Boolean(selectedTask)}>
                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {selectedTask && !openTaskForm ? (
                        <TaskView userRole={userRole} teams={projectTeams} openForm={()=>setOpenTaskForm(true)} task={selectedTask} onClose={handleCloseTaskView} onSave={handleSaveTaskForm} />
                    ):(
                        <TaskForm task={selectedTask} onSave={handleSaveTaskForm} onCancel={handleCancelTaskForm} open={openTaskForm} projectId={selectedProject ? selectedProject.id:''} />
                    )}
                </Box>
            </Modal>
            <Modal open={openProjectForm}>
                <ProjectForm onSave={handleSaveProjectForm} newProject={newProject} open={openProjectForm} project={selectedProject} onCancel={handleCancelProjectForm} />
            </Modal>
            <Box sx={{marginTop:10}}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <Box sx={{padding:1, boxShadow:2, height:'85vh', overflowY:'auto'}} >
                            <Box>
                                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography fontSize={16} fontWeight={700}>Projects</Typography>
                                    {(userRole && userRole !== 'teamMember') && (
                                        <IconButton size='small' onClick={()=>{setOpenProjectForm(true); setNewProject(true);}}>
                                            <AddIcon />
                                        </IconButton>
                                    )}
                                </Box>
                                <Divider />
                                {myProjects.map(p  => (
                                    <Box key={p.id} sx={{boxShadow:2, padding:0.5, marginTop:1, display:'flex', justifyContent:'space-between', alignItems:'center'}} onClick={()=>setSelectedProject(p)}>
                                        <Typography fontSize={13} fontWeight={500} >{p.title}</Typography>
                                        <IconButton size='small'>
                                            <ArrowRightIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                            {selectedProject&&(
                                <Box sx={{marginTop:2}}>
                                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                        <Typography fontSize={16} fontWeight={700}>Teams</Typography>
                                        {(userRole && userRole !== 'teamMember') && (
                                            <IconButton size='small' onClick={()=>setOpenTeamForm(true)}>
                                                <AddIcon />
                                            </IconButton>
                                        )}
                                    </Box>
                                    <Divider />
                                    {projectTeams.map(t => (
                                        <Box key={t.id} sx={{boxShadow:2, padding:0.5, marginTop:1, display:'flex', justifyContent:'space-between', alignItems:'center'}} onClick={()=>setSelectedTeam(t)}>
                                            <Typography fontSize={13} fontWeight={500} >{t.title}</Typography>
                                            <IconButton size='small'>
                                                <ArrowRightIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={10}>
                        <Box sx={{padding:1, boxShadow:1, height:'85vh', overflowY:'auto'}}>
                            {selectedProject&&(
                                <Box sx={{display:'flex', alignItems: 'flex-start', justifyContent:'space-between', marginBottom:2}}>
                                    <Box>
                                        <Typography fontSize={18} fontWeight={600}>{selectedProject.title}</Typography>
                                        <Typography fontSize={13} fontWeight={400}>{selectedProject.description}</Typography>
                                    </Box>
                                    {(userRole && userRole !== 'teamMember') ? (
                                        <Box>
                                            <Button size='small' variant="outlined" startIcon={<AddIcon />} sx={{marginRight:1}} onClick={()=>setOpenTaskForm(true)}>Add New Task</Button>
                                            <Button size='small' variant="contained" startIcon={<EditIcon />} onClick={()=>setOpenProjectForm(true)}>Edit</Button>
                                        </Box>
                                    ):(
                                        <FormGroup>
                                            <FormControlLabel control={<Switch checked={myTaskOnly} onChange={(e)=>setMyTaskOnly(e.target.checked)} />} label="My Tasks Only" />
                                        </FormGroup>
                                    )}
                                </Box>
                            )}
                            <Grid container spacing={1}>
                                {PROJECT_STATUS_ARRAY.map((s) => (
                                    <TaskContainer key={s.value} label={s.title}>
                                        {filterTasks(s.value).map(t=>(
                                            <Paper key={t.id} sx={{paddingX:0.5, marginTop:0.5, cursor:'pointer'}} onClick={()=>setSelectedTask(t)}>
                                                <Typography fontSize={12}>{t.title}</Typography>
                                                <Typography fontSize={10}>{moment(t.createdAt!).format(DATE_FORMAT)}</Typography>
                                            </Paper>
                                        ))}
                                    </TaskContainer>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Dashboard