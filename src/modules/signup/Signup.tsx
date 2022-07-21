import React from 'react'
import { Box } from '../../shared/Box'
import { Paper } from '../../shared/Paper'
import { Typography } from '../../shared/Typography'
import SignupForm from './components/SignupForm'

const Signup = () => {
    return (
        <Box sx={{width:'100%', display:'flex', justifyContent:'center', marginY:10}}>
            <Paper sx={{maxWidth:'sm', width:'100%', display:'flex', flexDirection:'column', boxShadow:5, paddingY:2}}>
                <Box width='100%'>
                    <Typography color='primary' variant='h4' paddingX={2} fontWeight={800}>SignUp</Typography>
                </Box>
                <SignupForm />
            </Paper>
        </Box>
    )
}

export default Signup