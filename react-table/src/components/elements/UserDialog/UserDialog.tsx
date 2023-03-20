import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { INewUser, IUser, Role, Status, Team, UserDialogViewMode, UserResponse } from '../../../models/User.model';
import { apiCreateUser, apiEditUser } from '../../../services/User.service';
import Box from '@mui/material/Box/Box';

interface IUserDialog {
  mode: UserDialogViewMode;
  editedUser?: IUser;
  handleUserListChanged: Function;
}
const UserDialog: FC<IUserDialog> = ({ mode, editedUser, handleUserListChanged }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    control,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: editedUser ? editedUser.userName : '',
      email: editedUser ? editedUser.email : '',
      role: editedUser ? editedUser.role : Role.FULLSTACK,
      status: editedUser ? editedUser.status : Status.FULLTIME,
      team: editedUser ? editedUser.team : Team.A,
    }
  });

  const onSubmit: SubmitHandler<IUser | INewUser> = async (formData) => {
    if (editedUser) {
      apiEditUser({
        id: editedUser.id,
        ...formData
      }).then((res: UserResponse) => {
        if (res.data.id) {
          setOpen(false);
          handleUserListChanged(res.data);
        }
      });
    } else {
      apiCreateUser(formData).then((res: UserResponse) => {
        if (res.data.id) {
          setOpen(false);
          handleUserListChanged(res.data);
        }
      });
    }
  }

  return (
    <div>
      {mode === UserDialogViewMode.EDIT ?
        <Button onClick={handleClickOpen}>Edit/View</Button>
        : (
          <Button onClick={handleClickOpen} color='success' variant='contained'>
            Create new user
          </Button>
        )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{mode === UserDialogViewMode.EDIT ? 'Edit ' : 'Create new '}user</DialogTitle>
        <Box className='wrapper'>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                autoFocus
                margin='dense'
                id='username'
                label='Name & Surname'
                type='text'
                fullWidth
                variant='outlined'
                required
                {...register('userName', { required: { value: true, message: 'Required field' } })}
              />
              <TextField
                margin='dense'
                id='email'
                label='Email Address'
                type='email'
                fullWidth
                variant='outlined'
                required
                {...register('email', {
                  required: {
                    value: true,
                    message: "Emails is a required field"
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Please, insert a valid email address'
                  }
                })}
              />
              <Controller
                name='role'
                control={control}
                render={({ field }) => (
                  <FormControl margin='dense' fullWidth>
                    <InputLabel id='role'>Role</InputLabel>
                    <Select {...field} label='Role'>
                      <MenuItem value={Role.FULLSTACK}>{Role.FULLSTACK}</MenuItem>
                      <MenuItem value={Role.BACKEND}>{Role.BACKEND}</MenuItem>
                      <MenuItem value={Role.FRONTEND}>{Role.FRONTEND}</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name='status'
                control={control}
                render={({ field }) => (
                  <FormControl margin='dense' fullWidth>
                    <InputLabel id='status'>Status</InputLabel>
                    <Select {...field} label='Status'>
                      <MenuItem value={Status.FULLTIME}>{Status.FULLTIME}</MenuItem>
                      <MenuItem value={Status.CONTRACTOR}>{Status.CONTRACTOR}</MenuItem>
                      <MenuItem value={Status.TEMP_UNAVAILABLE}>{Status.TEMP_UNAVAILABLE}</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name='team'
                control={control}
                render={({ field }) => (
                  <FormControl margin='dense' fullWidth>
                    <InputLabel id='team'>Team</InputLabel>
                    <Select {...field} label='Team'>
                      <MenuItem value={Team.A}>Team A</MenuItem>
                      <MenuItem value={Team.B}>Team B</MenuItem>
                      <MenuItem value={Team.C}>Team C</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit(onSubmit)} color='success' variant='contained'>Done</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default UserDialog;
