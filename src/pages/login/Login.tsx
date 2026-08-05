import { useEffect, useState } from "react";
import {
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
    Box,
    CircularProgress
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "../../models";
import { loginUser } from "../../redux/auth/authThunk";
import "./Login.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state=>state.auth);
    const [userName, setUserName] = useState('admin');
    const [password, setPassword] = useState('password');

    useEffect(()=>{
        if(auth.isAuthenticated){
            navigate('/dashboard',{replace:true});
        }
    },[auth.isAuthenticated, navigate]);

    const handleLogin = async () =>{
        const request:LoginRequest = {
            userName,
            password
        };
        const result = await dispatch(loginUser(request));
        if(loginUser.fulfilled.match(result)){
            navigate('/dashboard', {replace:true});
        }
    }

    return (

        <Box className="login-container">

            <Paper  elevation={10}  className="login-paper"
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                >
                    Invoice Management System
                </Typography>

                <Typography
                    align="center"
                    sx={{ mb: 3 }}
                >
                    Sign in to continue
                </Typography>

                {
                    auth.error &&
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {auth.error}
                    </Alert>
                }

                <TextField

                    fullWidth

                    label="User Name"

                    margin="normal"

                    value={userName}

                    onChange={(e) =>
                        setUserName(e.target.value)
                    }

                />

                <TextField

                    fullWidth

                    type="password"

                    label="Password"

                    margin="normal"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                    onKeyDown={(e) => {

                        if (e.key === "Enter") {

                            handleLogin();

                        }

                    }}

                />

                <Button

                    fullWidth

                    variant="contained"

                    sx={{ mt: 3 }}

                    disabled={auth.loading}

                    onClick={handleLogin}

                >

                    {
                        auth.loading ?

                            <CircularProgress
                                size={24}
                                color="inherit"
                            />

                            :

                            "Login"

                    }

                </Button>

            </Paper>

        </Box>

    );

}

