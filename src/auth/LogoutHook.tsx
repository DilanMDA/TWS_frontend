import React, {useContext} from 'react'
import { deleteCookie } from '../utils/CookieAccess';
import { removeAuthHeader } from '../apis/AxiosInstance';
import { AuthContext } from './AuthProvider';

const useLogout = () => {
    const authContext = useContext(AuthContext);

    const logout = () => {
        deleteCookie('refresh-token');
        deleteCookie('access-token');
        removeAuthHeader();
        authContext?.setAuth({
            loading:false,
            authenticated:false
        })
    }

    return logout;
}

export default useLogout