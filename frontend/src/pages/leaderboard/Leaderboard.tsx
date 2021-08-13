import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { findByLabelText } from '@testing-library/dom'
import React, { Component }  from 'react'
import axolot from './../../pictures/axolot.jpeg'
import bird from './../../pictures/bird.jpeg'
import cat from './../../pictures/cat.jpeg'
import fish from './../../pictures/fish.jpeg'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leaderboard: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    leaderboardList: {
      listStyle: 'none',
    },
    info: {
      display: 'flex',
      padding: '50px',
      border: 'solid black 1px',
      margin: 20,
      '&:hover': { cursor: 'pointer'}
    },
    subInfo: {
      paddingLeft: '10px'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1) * 3
    },
  })
)

export const Leaderboard = (): JSX.Element => {
  const style = useStyles()
  const data = [
    {
      name: 'Gautier',
      score: '400',
      img: axolot
    },
    {
      name: 'Corentin',
      score: '300',
      img: bird
    },
    {
      name: 'Yves',
      score: '200',
      img: cat
    },
    {
      name: 'Art',
      score: '100',
      img: fish
    },
  ]
  return (
    <div id='leaderboard' className={style.leaderboard}>
      <ul className={style.leaderboardList}>
        {data.map((d) => (<li key={d.name}>
          <div className={style.info}>
            <img src={d.img} alt='avatar' width='100' height='100'></img>
            <div className={style.subInfo}>
              <p>{d.name}</p>
              <p>Score : {d.score}</p>
            </div>
          </div>
        </li>)
        )}
      </ul>
    </div>
  )
}