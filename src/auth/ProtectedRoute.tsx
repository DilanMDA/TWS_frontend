import React, {useContext} from 'react'
import { AuthContext } from './AuthProvider';
import {Navigate} from 'react-router-dom';
import { APP_ROUTES } from '../application/constants/AppRoutes';

interface ProtectedRouteProps {
    children: any;
    roles?:string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
    const authContext = useContext(AuthContext);

    if(roles && roles.includes(authContext?.auth.user?.role??'none')) return children

    if(authContext?.auth.authenticated) return children

    if(authContext && !authContext.auth.loading) return <>Loading</>;

    return children
}

export default ProtectedRoute