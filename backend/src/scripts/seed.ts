import * as _ from 'lodash'
import { createConnection, ConnectionOptions } from 'typeorm'
import { configService } from '../config/config.service'
import { UserService } from '../user/user.service'
import { UserEntity } from '../model/user.entity'
import { UserDTO } from '../user/user.dto'

const run = async () => {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  }

  const connection = await createConnection(opt as ConnectionOptions)
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

  const work = _.range(0, 4)
    .map(n => UserDTO.from(mockUsers[n]))
    .map(dto => userService.create(dto)
      .then(r => (console.log('done ->', r.name), r)))

  return await Promise.all(work);
}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error))
