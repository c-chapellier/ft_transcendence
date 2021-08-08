import React from 'react'
import Home from './Home'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import Profile from './Profile'
import PageNotFound from './PageNotFound'

const useStyles = makeStyles(() =>
  createStyles({
    app: {
      backgroundColor: 'green',
    },
  })
)

const App = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Box className={classes.app}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/profile" component={Profile} />
        <Route component={PageNotFound} />
      </Switch>
    </Box>
  )
}

export default App
