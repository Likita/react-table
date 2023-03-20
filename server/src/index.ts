const express = require('express');
const cors = require('cors');
import { AppDataSource } from './data-source';
import { IUser, User } from './entity/User';
const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
.then(() => {
    console.log('Data Source has been initialized!');
})
.catch((err) => {
    console.error('Error during Data Source initialization:', err);
})

app.get('/users', cors(), async (request, res) => {
    try {
        const users = await AppDataSource.manager.find(User);
        users.sort((a: IUser, b: IUser) => a.userName > b.userName ? 1 : -1);
        res.json({
            status: true,
            users,
        });
    } catch(error) {
        console.log(error);
        return res.status(404).send({error: 'Something wrong with Users table'});
    }
});

app.put('/user', cors(), async (request, res) => {
    const newUser = request.body;
    const user = new User();
    user.userName = newUser.userName;
    user.email = newUser.email;
    user.role = newUser.role;
    user.status = newUser.status;
    user.team = newUser.team;
    try {
        const userSaved = await AppDataSource.manager.save(user);
        res.json(userSaved);
    } catch(error) {
        console.log(error);
        return res.status(409).send({error: 'Error: There is a user with such email'});
    }
});

app.patch('/user/:id', cors(), async (request, res) => {
    try {
        const foundUser = await AppDataSource.getRepository(User).findOneBy({
            id: request.params.id,
        });
        AppDataSource.getRepository(User).merge(foundUser, request.body);
        const results = await AppDataSource.getRepository(User).save(foundUser);
        return res.send(results);
    } catch(error) {
        console.log(error);
        return res.status(422).send({error: 'Unprocessable Entity. Entity is not found'});
    }
});

app.listen(8050, () => {
    console.log('CORS-enabled web server listening on http://localhost:8050');
});
