import React, { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import api from '@/utils/api';


interface LogoutDialogProps {
  setIsLogoutDialogOpen: Dispatch<SetStateAction<boolean>>;
}


function LogoutDialog({ setIsLogoutDialogOpen }: LogoutDialogProps) {
  const [openDialog, setOpenDialog] = useState(true);

  const navigate = useNavigate();

  const { toast } = useToast();

  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(localStorage.getItem('accessToken'));
    console.log(localStorage.getItem('refreshToken'));   
    try {
      const response = await api.get("/auth/logout", {
        baseURL: import.meta.env.VITE_BASE_AUTH_URL,
      });
      if (response.status === 200) {
        
        navigate('/login');
        setOpenDialog(false); // Close the dialog after logout
        toast({
          title: 'Success!',
          description: 'You have been logged out successfully.',
        });
      }

    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: 'An error occurred during logout.',
      });
      setIsLogoutDialogOpen(false);
    }
  };


  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
                Are you sure you want to log out?
            </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsLogoutDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  
}

export default LogoutDialog;