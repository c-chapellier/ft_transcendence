import axios from 'axios'
import { User } from '../interfaces/IGlobal'

export const getAllUsers = async (): Promise<User[]> => {
  const headers = { headers: { accept: '*/*' } }
  const res = await axios.get('http://localhost:3001/user', headers)

  return res.data
}

export const getUser = async (id: string): Promise<User[]> => {
  const headers = { headers: { accept: '*/*' } }
  const res = await axios.get(`http://localhost:3001/user?id=${id}`, headers)

  return res.data
}
