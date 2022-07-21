import React, { useContext, useEffect, useState } from 'react'
import { AppBar } from '../../../AppBar'
import { Box } from '../../../Box'
import { Container } from '../../../Container'
import { Toolbar } from '../../../Toolbar'
import { Typography } from '../../../Typography'
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../../../../auth/AuthProvider'
import useLogout from '../../../../auth/LogoutHook'
import { APP_ROUTES } from '../../../../application/constants/AppRoutes'
import { Button } from '../../../Button'
import { Avatar, IconButton } from '@mui/material'
import { LogoutIcon, UserIcon } from '../../../Icons'
import { Menu, MenuItem } from '../../../Menu'
import { ListItemIcon, ListItemText } from '../../../ListItem'

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation()
    const authContext = useContext(AuthContext);
    const [key, setKey] = useState('')
    const logout = useLogout();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [userRole, setUserRole] = useState('');

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const changeRoute = (route:string)=>{
        handleCloseUserMenu()
        navigate(`${route}`);
    }

    const handleLogout = ()=>{
        handleCloseUserMenu();
        logout();
        navigate(`/${APP_ROUTES.LOGIN}`);
    }

    useEffect(()=>{
        const paths = location.pathname.split('/');
        if(paths.length>0){
            setKey(paths[1])
        }
    },[location])

    useEffect(()=>{
        if(authContext && authContext.auth.authenticated){
            setUserRole(authContext.auth.user?.role??'')
        }
    },[authContext])

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Container maxWidth="xl">
                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <Typography fontSize={28} fontWeight={700}
                            sx={{cursor:'pointer'}}
                            onClick={()=>changeRoute(APP_ROUTES.DASHBOARD)}
                        >
                            PM
                        </Typography>
                        <Box sx={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                            <Menu
                                anchorEl={anchorElUser}
                                keepMounted
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                            >   
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                            {authContext?.auth.authenticated?(
                                <Box sx={{display:'flex', alignItems:'center'}}>
                                    {userRole === 'admin' && (
                                        <Button size='small' color='inherit' variant={(key === APP_ROUTES.USER_MANAGEMENT)?'outlined':undefined} onClick={()=>changeRoute(APP_ROUTES.USER_MANAGEMENT)} sx={{paddingRight:1}}>User Management</Button>
                                    )}
                                    <IconButton size="small" onClick={handleOpenUserMenu} sx={{marginLeft:1}}>
                                        <Avatar>
                                            <UserIcon fontSize='small' />
                                        </Avatar>
                                    </IconButton>
                                </Box>
                            ):(
                                <>
                                    <Button size='small' color='inherit' variant={(key === APP_ROUTES.LOGIN)?'outlined':undefined} onClick={()=>changeRoute(APP_ROUTES.LOGIN)} sx={{paddingRight:1}}>Login</Button>
                                    <Button size='small' color='inherit' variant={(key === APP_ROUTES.SIGNUP)?'outlined':undefined} onClick={()=>changeRoute(APP_ROUTES.SIGNUP)} sx={{paddingRight:1}}>SignUp</Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    )
}

export default Header