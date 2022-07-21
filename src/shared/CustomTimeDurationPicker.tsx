import React, {useEffect, useState} from 'react'
import { MinusIcon, PlusIcon, WatchIcon } from './Icons'
import { TextField } from './TextField'
import { Box } from './Box'
import { Button } from './Button'
import { BaseTextFieldProps, IconButton, InputAdornment, Typography } from '@mui/material'
import { Menu, MenuItem } from './Menu'

interface TimeDuration {
    days:number;
    hours:number;
    minutes:number;
}

interface CustomTimeDurationPickerProps {
    textFieldProps?:BaseTextFieldProps;
    minutes?:number;
    onChange?:(minutes:number)=>void;
}

export const getDuration = (minutes:number) => {
    const d = Math.floor(minutes/(24*60))
    const h = Math.floor(minutes%(60*24) / 60)
    const m = Math.floor(minutes%60)

    const durationArray:string[] = [];
    if(d){
        durationArray.push(`${d}d`)
    }
    if(h || m){
        durationArray.push(`${
            h.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false})
        }:${
            m.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false})
        }h`)
    }

    return(durationArray.join(', '))
}

const CustomTimeDurationPicker = ({textFieldProps, minutes, onChange}:CustomTimeDurationPickerProps) => {
    const [duration, setDuration] = useState<TimeDuration>({
        days:0,
        hours:0,
        minutes:0
    })
    const [clockValue, setClockValue] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const getDuration = () => {
        const durationArray:string[] = [];
        if(duration.days){
            durationArray.push(`${duration.days}d`)
        }
        if(duration.hours || duration.minutes){
            durationArray.push(`${
                duration.hours.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false})
            }:${
                duration.minutes.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false})
            }h`)
        }
        setClockValue(durationArray.join(', '))
    }

    useEffect(()=>{
        getDuration();
        handleOnChange();
    },[duration])

    const renderWatchIcon = () => {
        return (
            <InputAdornment sx={{p:'4px', cursor:'pointer'}} position='end'>
                <WatchIcon />
            </InputAdornment>
        )
    }

    const handleOnChange = ()=>{
        const totalMinutes = duration.minutes + (duration.hours * 60) + (duration.days * 24 * 60);
        if(onChange !== undefined) onChange(totalMinutes);
    }

    const handleDurationChange = (field:string, sign:string)=>{
        if(sign === '+'){
            if(field==='days'){
                setDuration((prev) => ({
                    ...prev,
                    days:prev.days+1
                }))
            }
            else if(field==='hours'){
                if(duration.hours+1 > 23) {
                    setDuration((prev) => ({
                        ...prev,
                        hours:0
                    }))
                    handleDurationChange('days', '+')
                }else{
                    setDuration((prev)=>({
                        ...prev,
                        hours:prev.hours+1
                    }))
                }
            }
            else if(field==='minutes'){
                if(duration.minutes+1 > 59) {
                    setDuration((prev) => ({
                        ...prev,
                        minutes:0
                    }))
                    handleDurationChange('hours', '+')
                }else{
                    setDuration((prev)=>({
                        ...prev,
                        minutes:prev.minutes+1
                    }))
                }
            }
        }else if(sign === '-'){
            if(field==='days' && duration.days > 0){
                setDuration((prev)=>({
                    ...prev,
                    days:prev.days-1
                }))
            }
            else if(field==='hours'){
                if(duration.hours-1 < 0 && duration.days>0) {
                    setDuration((prev)=>({
                        ...prev,
                        hours:23
                    }))
                    handleDurationChange('days', '-')
                }else if(duration.hours > 0){
                    setDuration((prev)=>({
                        ...prev,
                        hours:prev.hours-1
                    }))
                }
            }
            else if(field==='minutes'){
                if(duration.minutes-1 < 0 && duration.hours>0) {
                    setDuration((prev)=>({
                        ...prev,
                        minutes:59
                    }))
                    handleDurationChange('hours', '-')
                }else if(duration.minutes > 0){
                    setDuration((prev)=>({
                        ...prev,
                        minutes:prev.minutes-1
                    }))
                }
            }
        }
    }

    const handleClick = (event:any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(()=>{
        const totalMinutes = duration.minutes + (duration.hours * 60) + (duration.days * 24 * 60);
        if(minutes && totalMinutes!==minutes){
            const d = Math.floor(minutes/(24*60))
            const h = Math.floor(minutes%(60*24) / 60)
            const m = Math.floor(minutes%60)
            setDuration({
                days:d,
                hours:h,
                minutes:m
            })
        }
    },[minutes])

    const reset = ()=>{
        setDuration({
            days:0,
            hours:0,
            minutes:0
        })
    }

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                disableScrollLock={false}
            >
                <Box sx={{padding:1}}>
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', marginX:'5px'}}>
                            <Typography fontSize={14} fontWeight={500}>Days</Typography>
                            <IconButton onClick={()=>{
                                handleDurationChange('days', '+')
                            }}>
                                <PlusIcon /> 
                            </IconButton>
                            <TextField 
                                size='small'
                                inputProps={{style: { textAlign: 'center' }}}
                                sx={{width:'60px'}}
                                value={`${duration.days}`}
                                onChange={(e)=>{
                                    if(e.target.value === '') setDuration({
                                        ...duration,
                                        days:0
                                    })
                                    if(parseInt(e.target.value)){
                                        setDuration({
                                            ...duration,
                                            days:parseInt(e.target.value)
                                        })
                                    }
                                }}
                            />
                            <IconButton onClick={()=>{
                                handleDurationChange('days', '-')
                            }}>
                                <MinusIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', marginX:'5px'}}>
                            <Typography fontSize={14} fontWeight={500}>Hours</Typography>
                            <IconButton onClick={()=>{
                                handleDurationChange('hours', '+')
                            }}>
                                <PlusIcon /> 
                            </IconButton>
                            <TextField 
                                size='small'
                                inputProps={{style: { textAlign: 'center' }}}
                                sx={{width:'60px'}}
                                value={`${duration.hours.toLocaleString('en-US', {
                                    minimumIntegerDigits: 2,
                                    useGrouping: false})}`}
                                onChange={(e)=>{
                                    if(e.target.value === '0') setDuration({
                                        ...duration,
                                        hours:0
                                    })
                                    if(parseInt(e.target.value) < 24){
                                        setDuration({
                                            ...duration,
                                            hours:parseInt(e.target.value)
                                        })
                                    }
                                }}
                            />
                            <IconButton onClick={()=>{
                                handleDurationChange('hours', '-')
                            }}>
                                <MinusIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', marginX:'5px'}}>
                            <Typography fontSize={14} fontWeight={500}>Minutes</Typography>
                            <IconButton onClick={()=>{
                                handleDurationChange('minutes', '+')
                            }}>
                                <PlusIcon /> 
                            </IconButton>
                            <TextField 
                                size='small'
                                inputProps={{style: { textAlign: 'center' }}}
                                sx={{width:'60px', textAlign:'center'}}
                                value={`${duration.minutes.toLocaleString('en-US', {
                                    minimumIntegerDigits: 2,
                                    useGrouping: false})}`}
                                onChange={(e)=>{
                                    if(e.target.value === '0') setDuration({
                                        ...duration,
                                        minutes:0
                                    })
                                    if(parseInt(e.target.value) < 60){
                                        setDuration({
                                            ...duration,
                                            minutes:parseInt(e.target.value)
                                        })
                                    }
                                }}
                            />
                            <IconButton onClick={()=>{
                                handleDurationChange('minutes', '-')
                            }}>
                                <MinusIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                        <Button onClick={()=>setAnchorEl(null)}>Done</Button>
                        <Button onClick={reset}>Reset</Button>
                    </Box>
                </Box>
            </Menu>
            <TextField 
                {...textFieldProps}
                value={clockValue}
                InputProps={{
                    endAdornment: renderWatchIcon(),
                    readOnly:true
                }}
                onClick={handleClick}
            />
        </>
    )
}

export default CustomTimeDurationPicker