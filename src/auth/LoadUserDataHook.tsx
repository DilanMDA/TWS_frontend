import React, {useContext, useEffect} from 'react'
import { AuthContext } from './AuthProvider';
import UserApi from '../apis/UserApi';

const useLoadUserData = () => {
    const authContext = useContext(AuthContext);

    const loadUserData = ()=>{
        authContext?.setAuth({
            loading:true,
            authenticated:false
        })
        UserApi.getUserData().then((response)=>{
            authContext?.setAuth({
                loading:false,
                authenticated:true,
                user:response
            })
        }).catch((error)=>{
            authContext?.setAuth({
                loading:false,
                authenticated:false
            })
        })
    }

    return loadUserData;
}

export default useLoadUserData;