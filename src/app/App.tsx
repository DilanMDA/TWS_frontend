import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from '../theme/defaultTheme';
import DefaultLayout from '../shared/layout/default/DefaultLayout';
import { Routes, Route, Navigate } from "react-router-dom";
import { APP_ROUTES } from '../application/constants/AppRoutes';
import Login from '../modules/login/Login';
import Signup from '../modules/signup/Signup';
import useAuthState from '../auth/AuthHeaderHook';
import useLoadUserData from '../auth/LoadUserDataHook';
import Dashboard from '../modules/dashboard/Dashboard';

function App() {

  const authState = useAuthState();
  const loadUserData = useLoadUserData();

  useEffect(() => {
    if(authState.authenticated){
      loadUserData();
    }
  }, [authState])

  return (
    <ThemeProvider theme={defaultTheme}>
      <DefaultLayout>
        <Routes>
          <Route path={`${APP_ROUTES.DASHBOARD}`} element={<Dashboard />} />
          <Route path={`${APP_ROUTES.LOGIN}`} element={<Login />} />
          <Route path={`${APP_ROUTES.SIGNUP}`} element={<Signup />} />
        </Routes>
      </DefaultLayout>
    </ThemeProvider>
  );
}

export default App;
