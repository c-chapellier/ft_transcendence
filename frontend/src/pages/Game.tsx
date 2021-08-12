import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  gameSection: {
    width: '100%',
    height: '85vh'
  },

})

const Game = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Grid container component={Paper} className={classes.gameSection}>
    </Grid>
  )
}

export default Game
