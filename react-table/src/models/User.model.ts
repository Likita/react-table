type UserListSuccessResponse = {
  data: {
    status: true;
    users: IUser[];
  }
}

type FailResponse = {
  data: {
    status: false;
    error: string;
  }
}

export type UserListResponse = UserListSuccessResponse | FailResponse;

export type UserResponse = {
  data: IUser
};

export interface INewUser {
  userName: string;
  email: string;
  role: Role;
  status: Status;
  team: Team;
}

export interface IUser extends INewUser {
  id: string;
  speaker?: boolean
}

export enum Role {
  FULLSTACK = 'Fullstack',
  FRONTEND = 'Frontend',
  BACKEND = 'Backend',
}

export enum Status {
  FULLTIME = 'Full time',
  CONTRACTOR = 'Contractor',
  TEMP_UNAVAILABLE = 'Temporarily unavailable',
}

export enum Sort {
  RANDOMIZE = 'Randomize',
  SORT_BY_NAME = 'Sort by name',
}

export enum Team {
  A = 'Team A',
  B = 'Team B',
  C = 'Team C',
  ALL = 'All'
}

export enum UserDialogViewMode {
  CREATE,
  EDIT,
}
