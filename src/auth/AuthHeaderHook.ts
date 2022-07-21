import { useEffect, useState } from 'react';
import { setAuthHeader } from '../apis/AxiosInstance';
import { User } from '../application/models/UserModel';
import { getCookie } from '../utils/CookieAccess';
import { refreshAccessToken } from './AuthService';

export interface AuthState {
    loading:boolean;
    authenticated:boolean;
}

const useAuthState = () =>{
    const [authState, setAuthState] = useState<AuthState>({
        loading:false,
        authenticated:false
    });

    const authProcess = async ()=>{
        const access_token = getCookie('access-token');
        const refresh_token = getCookie('refresh-token');
        if(access_token){
            setAuthHeader(access_token as string);
            setAuthState({
                loading:false,
                authenticated:true
            });
        }else{
            if(refresh_token){
                setAuthState({
                    loading:true,
                    authenticated:false
                });
                const result = await refreshAccessToken();
                if(result){
                    setAuthState({
                        loading:false,
                        authenticated:true
                    });
                }else{
                    setAuthState({
                        loading:false,
                        authenticated:false
                    });
                }
            }
        }
    }

    useEffect(()=>{
        authProcess();
    },[])

    return authState;
}

export default useAuthState;