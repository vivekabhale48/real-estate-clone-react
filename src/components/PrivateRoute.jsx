import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useAuthStatus } from '../customHooks/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
    const {isLoggedIn, checkingStatus} = useAuthStatus();

    //Here if we removed the below line then the authentication wont work, even tough we are sign in and try to hit the profile route we would get redirected to the signin route because the page of react would load before useAuthStatus hook. So now because of line 9 or below line it is checking the status so the loading is shown on the screen until the status loggedin is being checked. After that the next 10th line is executed.
    if(checkingStatus) return <Spinner />
    return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default PrivateRoute