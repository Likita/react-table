import { AppDataSource } from './data-source';
import { INewUser, Role, Status, Team, User } from './entity/User';

function fillMockData() {
    let userArr = [];
    let mockData:INewUser[] = [
        {
            userName: 'Alberto Summers',
            email: 'albereto@beyondplay.io',
            role: Role.FULLSTACK,
            status: Status.FULLTIME,
            team: Team.A
        },
        {
            userName: 'Gina Brady',
            email: 'gina@beyondplay.io',
            role: Role.FULLSTACK,
            status: Status.FULLTIME,
            team: Team.A,
        },
        {
            userName: 'Jody Rice',
            email: 'jody@beyondplay.io',
            role: Role.FRONTEND,
            status: Status.CONTRACTOR,
            team: Team.B,
        },
        {
            userName: 'Kay Sandoval',
            email: 'kay@beyondplay.io',
            role: Role.FRONTEND,
            status: Status.TEMP_UNAVAILABLE,
            team: Team.C,
        },
        {
            userName: 'Willis Daniel',
            email: 'willis@beyondplay.io',
            role: Role.BACKEND,
            status: Status.FULLTIME,
            team: Team.A,
        },
        {
            userName: 'Vasilika Klimova',
            email: '2607lika@gmail.com',
            role: Role.FULLSTACK,
            status: Status.FULLTIME,
            team: Team.A,
        }
    ];

    for (let i = 0; i < mockData.length; i++) {
        const current = mockData[i];
        const user = new User();
        user.userName = current.userName;
        user.email = current.email;
        user.role = current.role;
        user.status = current.status;
        user.team = current.team;
        userArr.push(user);
    }

    return userArr;
}

AppDataSource.initialize().then(async () => {
    await AppDataSource.manager.save(fillMockData())
}).catch(error => console.log(error))
