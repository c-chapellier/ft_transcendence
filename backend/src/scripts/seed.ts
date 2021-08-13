import * as _ from 'lodash'
import { createConnection, ConnectionOptions, Connection } from 'typeorm'
import { configService } from '../config/config.service'
import { UserService } from '../user/user.service'
import { UserEntity } from '../model/user.entity'
import { UserDTO } from '../user/user.dto'
import { ChannelService } from '@src/channel/channel.service'
import { ChannelEntity } from '@src/model/channel.entity'
import { ChannelDTO } from '@src/channel/channel.dto'
import { channel } from 'diagnostics_channel'
import { MessageEntity } from '@src/model/message.entity'
import { MessageService } from '@src/message/message.service'
import { MessageDTO } from '@src/message/message.dto'

const run = async () => {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  }

  console.log("Init connection..")
  const connection = await createConnection(opt as ConnectionOptions)

  // USERS
  console.log("Create users")
  const users = await new UserService(connection.getRepository(UserEntity)).getAllUsers();
  if(users.length == 0)
    await createUsers(connection);

  // CHANNELS
  console.log("Create channels")
  const channels = await new ChannelService(connection.getRepository(ChannelEntity)).getAllChannels();
  if(channels.length == 0)
    await createChannels(connection);

  // Messages
  console.log("Create messages")
  const messages = await new MessageService(connection.getRepository(MessageEntity)).getAllMessages();
  if(messages.length == 0)
    await createMessages(connection);
}

async function createUsers(connection: Connection) {
  const userService = new UserService(connection.getRepository(UserEntity))

  const mockUsers = [
    {
      name: 'Yves',
      description: 'salut y',
      isOnline: true,
      isPlaying: false,
      has2FactorAuth: false,
      level: 12,
      nbrVictory: 1,
      nbrLoss: 736,
    },
    {
      name: 'Gautier',
      description: 'salut g',
      isOnline: true,
      isPlaying: false,
      has2FactorAuth: false,
      level: 14,
      nbrVictory: 2,
      nbrLoss: 1,
    },
    {
      name: 'Arthur',
      description: 'salut a',
      isOnline: true,
      isPlaying: false,
      has2FactorAuth: false,
      level: 20,
      nbrVictory: 20,
      nbrLoss: 20,
    },
    {
      name: 'Corentin',
      description: 'salut c',
      isOnline: true,
      isPlaying: false,
      has2FactorAuth: false,
      level: 200,
      nbrVictory: 1000,
      nbrLoss: 0,
    },
  ]

  const work = _.range(0, mockUsers.length)
    .map(n => UserDTO.from(mockUsers[n]))
    .map(dto => userService.create(dto)
      .then(r => (console.log('done ->', r.name), r)))

  await Promise.all(work);
}

async function createChannels(connection: Connection) {
  const channelService = new ChannelService(connection.getRepository(ChannelEntity));
  const users = await new UserService(connection.getRepository(UserEntity)).getAllUsers();

  console.log(users);

  const mockChannels = [
    {
      name: 'The bad boys',
      pwd: 'winners',
      owner: users[0],
      users: users,
      messages: [],
    },
    {
      name: 'The others',
      pwd: 'losers',
      owner: users[0],
      users: users,
      messages: [],
    },
  ]

  const work = _.range(0, mockChannels.length)
    .map(n => ChannelDTO.from(mockChannels[n]))
    .map(dto => channelService.create(dto)
      .then(r => (console.log('done ->', r.name), r)))
    
  await Promise.all(work);
}

async function createMessages(connection: Connection) {
  const messageService = new MessageService(connection.getRepository(MessageEntity));
  const channels = await new ChannelService(connection.getRepository(ChannelEntity)).getAllChannels();
  const users = await new UserService(connection.getRepository(UserEntity)).getAllUsers();

  console.log(channels);
  console.log(users);

  const mockMessages = [
    {
      text: "Coucouuuu",
      date: new Date(),
      channel: channels[0],
      sender: users[0],
    },
    {
      text: "Yo",
      date: new Date(),
      channel: channels[0],
      sender: users[1],
    },
    {
      text: "Comment va ?",
      date: new Date(),
      channel: channels[0],
      sender: users[0],
    },
    {
      text: "Trop bien, j'adore gagner",
      date: new Date(),
      channel: channels[0],
      sender: users[1],
    },
    {
      text: "Heureusement qu'on est des bg",
      date: new Date(),
      channel: channels[0],
      sender: users[0],
    },
  ]

  const work = _.range(0, mockMessages.length)
    .map(n => MessageDTO.from(mockMessages[n]))
    .map(dto => messageService.create(dto)
      .then(r => (console.log('done ->', r.text), r)))
    
  await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error))
