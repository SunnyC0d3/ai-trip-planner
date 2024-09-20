import React from 'react'
import logo from '../../assets/logo.svg'
import { Button } from './Button';
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { googleLogout } from '@react-oauth/google';
import useLogin from '@/hooks/useLogin';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { openDialog, setOpenDialog, login } = useLogin();

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src={logo} alt="logo" />
      <div>
        {
          user
            ?
            <div className="flex items-center gap-3">
              <a href="/my-trips"><Button variant="outline" className="rounded-full">My Trips</Button></a>
              <Popover>
                <PopoverTrigger><img src={user?.picture} className="w-[50px] h-[50px] rounded-full" /></PopoverTrigger>
                <PopoverContent><Button onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</Button></PopoverContent>
              </Popover>

            </div>
            :
            <>
              <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
              <Dialog open={openDialog}>
                <DialogContent>
                  <DialogHeader>
                    <img className="w-20 h-20 mb-5" src={logo} alt="logo" />
                    <DialogTitle>Sign in with Google</DialogTitle>
                    <DialogDescription>
                      Sign in to the App with Google authentication securely
                      <Button className="w-full mt-5 flex gap-4 items-center" onClick={login}>
                        <FcGoogle className="h-7 w-7" /> Sign in with Google
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </>
        }
      </div>
    </div>
  )
}

export default Header