
export interface User {
  id: string
  name: string
  description: string
  isOnline: boolean
  isPlaying: boolean
  has2FactorAuth: boolean
  level: number
  nbrVictory: number
  nbrLoss: number
}
