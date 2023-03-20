import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

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

export enum Team {
  A = 'Team A',
  B = 'Team B',
  C = 'Team C',
}

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

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    userName: string

    @Column({ unique: true })
    email: string

    @Column()
    role: Role

    @Column()
    status: Status

    @Column()
    team: Team

}
