import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/auth/authSlice";

export default function Logout() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(logout());

        // Remove JWT Token
        localStorage.removeItem("token");

        // Remove user information if stored
        localStorage.removeItem("user");

        // Optional: clear everything
        // localStorage.clear();

        navigate("/login", {
            replace: true
        });

    }, [dispatch, navigate]);


   return (
        <></>
    );
}