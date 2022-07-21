import SessionApi from '../apis/SessionApi';
import { setCookie, getCookie, deleteCookie } from '../utils/CookieAccess';
import { setAuthHeader } from '../apis/AxiosInstance';

export const refreshAccessToken = async ()=>{
    const refresh_token = getCookie('refresh-token');
    try{
        const response = await SessionApi.refreshToken(refresh_token as string)
        setCookie('access-token', response.accessToken, 1);
        setAuthHeader(response.accessToken);
        return true;
    }catch (error){
        deleteCookie('access-token');
        deleteCookie('refresh-token');
        return false;
    }
}