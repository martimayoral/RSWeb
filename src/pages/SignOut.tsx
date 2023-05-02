import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { authActions } from "../redux/auth/slice";
import { useNavigate } from "react-router-dom";

export function SignOut() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authActions.setAuthStatus("no_auth"))
        navigate("/")
    }, [dispatch, navigate])
    return <></>
}