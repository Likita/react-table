import axios from 'axios';
import { UserListResponse, IUser, INewUser, UserResponse } from '../models/User.model';

const apiLink = 'http://localhost:8050';

export const apiGetUserList = () =>
  axios.get(`${apiLink}/users`).then((response: UserListResponse) => {
    return response;
  })

export const apiCreateUser = (user: INewUser) =>
  axios.put(`${apiLink}/user`, user).then((response: UserResponse) => {
    return response;
  })

export const apiEditUser = (user: IUser) =>
  axios.patch(`${apiLink}/user/${user.id}`, user).then((response: UserResponse) => {
    return response;
  })
