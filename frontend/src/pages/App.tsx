import React from 'react'
import Home from './Home'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Theme } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import Profile from './Profile'
import PageNotFound from './PageNotFound'
import AppBars from '../components/AppBars'
import Chat from './Chat'
import Game from './Game'
import { Leaderboard } from './leaderboard/Leaderboard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(1),
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1) * 3
    },
  })
)

const App = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.root}>
        <AppBars />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/profile" component={Profile} />
            <Route path="/game" component={Game} />
            <Route path="/chat" component={Chat} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route component={PageNotFound} />
          </Switch>
        </main>
      </Box>
      {/* <Footer /> */}
    </Box>
  )
}

export default App
