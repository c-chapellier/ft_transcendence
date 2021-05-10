import express from 'express'
import { User } from './model/user/user.entity'
import { createConnection } from "typeorm";
import { Request, Response } from "express"
import { Channel } from './model/channel/channel.entity';
import { Guild } from './model/guild/guild.entity';
import { Match } from './model/match/match.entity';
import { Message } from './model/message/message.entity';
import userRouter from './routers/user.router';

const app = express();
const port = 8080;

createConnection().then((connection) => {
    const guildRepository = connection.getRepository(Guild);
    const channelRepository = connection.getRepository(Channel);
    const messageRepository = connection.getRepository(Message);
    const matchRepository = connection.getRepository(Match);
    const userRepository = connection.getRepository(User);

    

    app.use('/test', userRouter);

    // app.get( "/", async ( req, res ) => {
    //     const users = await userRepository.find();
    //     res.json(users);
    //     // res.send( "Hello world!" );
    // } );

    // app.get("/users/:id", async function(req: Request, res: Response) {
    //     const results = await userRepository.findOne(req.params.id);
    //     return res.send(results);
    // });

    // app.post("/users", async function(req: Request, res: Response) {
    //     const user = await userRepository.create(req.body);
    //     const results = await userRepository.save(user);
    //     return res.send(results);
    // });

    // app.put("/users/:id", async function(req: Request, res: Response) {
    //     const user = await userRepository.findOne(req.params.id);
    //     if (user) {
    //         userRepository.merge(user, req.body);
    //         const results = await userRepository.save(user);
    //         return res.send(results);
    //     }
    // });

    // app.delete("/users/:id", async function(req: Request, res: Response) {
    //     const results = await userRepository.delete(req.params.id);
    //     return res.send(results);
    // });

    // start the Express server
    app.listen( port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );

})
