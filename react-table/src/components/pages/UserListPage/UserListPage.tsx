import React, { useEffect, useState } from 'react';
import Header from '../../elements/Header/Header';
import Table from '../../elements/UserTable/UserTable';
import './UserListPage.css';
import UserDialog from '../../elements/UserDialog/UserDialog';
import RandomizerDialog from '../../elements/RandomizerDialog/RandomizerDialog';
import { IUser, UserDialogViewMode, UserListResponse } from '../../../models/User.model';
import { apiGetUserList } from '../../../services/User.service';

const UserListPage: React.FC = () => {
  let [userList, setUserList] = useState<IUser[]>([]);

  useEffect(() => {
    apiGetUserList().then((res: UserListResponse) => {
      if (res.data.status === true) {
        setUserList(res.data.users);
      }
    });
  }, []);

  const handleUserListChanged = (user: IUser) => {
    const newUserList = [
      ...userList,
    ];
    const index = userList.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      newUserList[index] = user;
    } else {
      newUserList.push(user);
    }
    setUserList(newUserList.sort((a: IUser, b: IUser) => a.userName > b.userName ? 1 : -1));
  }

  return (
    <>
      <Header></Header>
      <main className='main'>
        <div className='panel'>
          <RandomizerDialog userList={userList}/>
          <UserDialog mode={UserDialogViewMode.CREATE} handleUserListChanged={handleUserListChanged}/>
        </div>
        <Table userList={userList} handleUserListChanged={handleUserListChanged}></Table>
      </main>
    </>
  );
}

export default UserListPage;
