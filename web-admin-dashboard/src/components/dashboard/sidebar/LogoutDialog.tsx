import React, { useState } from 'react';
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
import axios from 'axios';


interface LogoutDialogProps {
  onCancel: () => void;
}

function LogoutDialog({ onCancel }: LogoutDialogProps) {
  const [openDialog, setOpenDialog] = useState(true);

  const navigate = useNavigate();

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/logout"); 
      if (response.status === 200) {
        //clear local storage accesstokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setOpenDialog(false); // Close the dialog after logout
        navigate('/login');
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
        <AlertDialogCancel onClick={() => onCancel()}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
      </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  
}

export default LogoutDialog;