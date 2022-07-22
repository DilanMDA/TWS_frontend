import React, { useContext, useEffect, useState } from 'react';
import { Button, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Box } from '../../shared/Box';
import UserApi from '../../apis/UserApi';
import { User } from '../../application/models/UserModel';
import { AuthContext } from '../../auth/AuthProvider';
import { Collapse } from '../../shared/Collapse';
import { USER_ROLES_ARRAY } from '../../application/constants/AppConstants';
import { MenuItem } from '../../shared/Menu';

const UserManagement = () => {

    const [users, setUsers] = useState<User[]>([]);
    const authContext = useContext(AuthContext);
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('');

    const handleRoleChange = async (e:any) => {
        const value = e.target.value;
        try{
            if(userId && role){
                const response = await UserApi.updateUserAsync(userId, {role:value});
                setUserId('')
                setRole('')
                setUsers(
                    users.map(u => {
                        if(u.id === userId) return response;
                        return u
                    })
                )
            }
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{
        if(authContext?.auth.authenticated){
            UserApi.getAllUsers()
            .then((response)=>{
                setUsers(response.rows)
            })
        }
    },[authContext])

    return (
        <>
            <Box sx={{marginTop:10}}>
                <Table
                    size='small'
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell sx={{display:'flex', justifyContent:'flex-end'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>{u.name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>
                                    {userId !== u.id ?(
                                        <>
                                            {u.role}
                                        </>
                                    ):(
                                        <Box>
                                            <Select
                                                size='small'
                                                variant='standard'
                                                value={role}
                                                onChange={handleRoleChange}
                                            >
                                                {USER_ROLES_ARRAY.map(r => (
                                                    <MenuItem key={r.value} value={r.value}>{r.title}</MenuItem>
                                                ))}
                                            </Select>
                                        </Box>
                                    )}
                                </TableCell>
                                <TableCell>{u.mobileNumber}</TableCell>
                                <TableCell sx={{display:'flex', justifyContent:'flex-end'}}>
                                    <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                                        <Button size="small" sx={{padding:0}} onClick={()=>{setUserId(u.id); setRole(u.role)}} >Change Role</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

{/* <TableRow key={`edit-${u.id}`}>
    <TableCell colSpan={5}>
        <Collapse
            in={userId === u.id}
        >
            Test
        </Collapse>
    </TableCell>
</TableRow> */}

export default UserManagement