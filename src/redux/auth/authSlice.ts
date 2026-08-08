import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";
import { saveToken, removeToken } from "../../utils/tokenStorage";
import type { User } from "../../models/user";

interface AuthState{
    loading:boolean;
    isAuthenticated:boolean;
    token:string|null;
    user: User|null;
    expiration:string|null;
    error:string|null;
}

const initialState:AuthState = {
    loading:false,
    isAuthenticated:false,
    user: null,
    token:null,
    expiration:null,
    error:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout(state){
            removeToken();
            state.loading=false;
            state.isAuthenticated=false;
            state.user = null;
            state.token=null;
            state.expiration=null;
            state.error=null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(
            loginUser.pending,(state) =>{
                state.loading=true;
                state.error=null;
            }
        )
        builder.addCase(
            loginUser.fulfilled,
            (state, action) =>{
                state.loading=false;
                state.isAuthenticated=true;
                state.token=action.payload.token;
                state.expiration = action.payload.expiration;
                state.user = action.payload.user;
                saveToken(action.payload.token);
                localStorage.setItem(
                    "user",
                   JSON.stringify(action.payload.user)
                );
            }
        )
        builder.addCase(
            loginUser.rejected,
            (state, action) =>{
                state.loading=false;
                state.error = action.payload ?? "Login failed.";
            }
        )
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;


