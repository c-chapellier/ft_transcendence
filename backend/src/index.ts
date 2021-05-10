import express from 'express'
import { User } from './model/user/user.entity'
import { createConnection } from "typeorm";
import { Request, Response } from "express"
import { Channel } from './model/channel/channel.entity';
import { Guild } from './model/guild/guild.entity';
import { Match } from './model/match/match.entity';
import { Message } from './model/message/message.entity';
import { createRouter } from './routers/generic.router';

const app = express();
const port = 8080;

createConnection().then((connection) => {
    const guildRepository = connection.getRepository(Guild);
    const channelRepository = connection.getRepository(Channel);
    const messageRepository = connection.getRepository(Message);
    const matchRepository = connection.getRepository(Match);
    const userRepository = connection.getRepository(User);

    const userRouter = createRouter(userRepository);
    const matchRouter = createRouter(matchRepository);
    const channelRouter = createRouter(channelRepository);
    const messageRouter = createRouter(messageRepository);
    const guildRouter = createRouter(guildRepository);

    app.use('/users', userRouter);
    app.use('/messages', messageRouter);
    app.use('/channels', channelRouter);
    app.use('/guilds', guildRouter);
    app.use('/matches', matchRouter);

    app.listen( port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );
})