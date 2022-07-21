import { IconButton } from '@mui/material'
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
import { PROJECT_STATUS_ARRAY } from '../../application/constants/AppConstants'
import { Task } from '../../application/models/TaskModels'
import TaskForm from './components/TaskForm'
import TaskView from './components/TaskView'

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

    const getMyProjects = async()=>{
        try{
            const response = await ProjectApi.getMyProjectsAsync();
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

    const filterTasks = (status:string)=>{
        return projectTasks.filter(t => t.status === status)
    }

    const handleCancelProjectForm = ()=>{
        setOpenProjectForm(false);
        setNewProject(false);
    }

    const handleCancelTaskForm = () => {
        setOpenTaskForm(false);
        setSelectedTask(null);
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

    useEffect(()=>{
        if(authContext && authContext.auth.authenticated){
            getMyProjects();
        }
    },[authContext])

    useEffect(()=>{
        if(selectedProject) getProjectTasks();
    },[selectedProject])

    return (
        <>
            <Modal open={openTaskForm || Boolean(selectedTask)}>
                <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {selectedTask && !openTaskForm ? (
                        <TaskView task={selectedTask} onClose={handleCloseTaskView} onSave={handleSaveTaskForm} />
                    ):(
                        <TaskForm onSave={handleSaveTaskForm} onCancel={handleCancelTaskForm} open={openTaskForm} projectId={selectedProject ? selectedProject.id:''} />
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
                                    <IconButton size='small' onClick={()=>{setOpenProjectForm(true); setNewProject(true);}}>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Divider />
                                {myProjects.map(p  => (
                                    <Box key={p.id} sx={{boxShadow:2, padding:0.5, marginTop:1, display:'flex', justifyContent:'space-between', alignItems:'center'}} onClick={()=>setSelectedProject(p)}>
                                        <Typography fontSize={15} fontWeight={500} >{p.title}</Typography>
                                        <IconButton size='small'>
                                            <ArrowRightIcon />
                                        </IconButton>
                                    </Box>
                                ))}
                            </Box>
                            <Box>
                                <Box sx={{padding:1}}>
                                    <Typography textAlign='center'>Current Project</Typography>
                                </Box>
                                <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography fontSize={16} fontWeight={700}>Teams</Typography>
                                    <IconButton size='small'>
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Divider />
                                <Box sx={{boxShadow:2, padding:0.5, marginTop:1, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                                    <Typography fontSize={15} fontWeight={500} >Project 1</Typography>
                                    <IconButton size='small'>
                                        <ArrowRightIcon />
                                    </IconButton>
                                </Box>
                            </Box>
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
                                    <Box>
                                        <Button size='small' variant="outlined" startIcon={<AddIcon />} sx={{marginRight:1}} onClick={()=>setOpenTaskForm(true)}>Add New Task</Button>
                                        <Button size='small' variant="contained" startIcon={<EditIcon />} onClick={()=>setOpenProjectForm(true)}>Edit</Button>
                                    </Box>
                                </Box>
                            )}
                            <Grid container spacing={1}>
                                {PROJECT_STATUS_ARRAY.map((s) => (
                                    <TaskContainer key={s.value} label={s.title}>
                                        {filterTasks(s.value).map(t=>(
                                            <Paper key={t.id} sx={{paddingX:0.5, marginTop:0.5, cursor:'pointer'}} onClick={()=>setSelectedTask(t)}>
                                                <Typography fontSize={12}>{t.title}</Typography>
                                                <Typography fontSize={10}>{t.createdAt!}</Typography>
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