import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function useLogin() {
    const [openDialog, setOpenDialog] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const getUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json'
            }
        }).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data));
            setOpenDialog(false);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return {
        openDialog,
        setOpenDialog,
        login
    };
}