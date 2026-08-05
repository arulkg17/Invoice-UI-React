import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { isLoggedIn } from '../utils/tokenStorage';


interface Props {

    children: ReactNode;

}


export default function ProtectedRoute(
    {children}: Props
) {


    if(!isLoggedIn()){

        return <Navigate to="/login" replace />;

    }


    return children;

}