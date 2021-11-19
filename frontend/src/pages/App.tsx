import React, { useState } from 'react'
import Home from './Home'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box, Theme } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import Profile from '../artainmo-src/pages/userAccount/profile'
import PageNotFound from './PageNotFound'
import AppBars from '../components/AppBars'
import ChatChannelsView from '../artainmo-src/pages/chat/chatChannelsView'
import Game from '../artainmo-src/pages/game/play'
import Authentification from '../artainmo-src/pages/userAccount/authentification'
import accountType from '../artainmo-src/types/accountType'
import { Leaderboard } from './leaderboard/Leaderboard'

type authState = "login" | "signup" | "done" | null;

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
  const classes = useStyles();
  const empty_account: accountType = {name: '', password: '', avatar: null, victories: 0, losses: 0, matchHistory: [], friends: [], chatChannels: []};
	const [loginOrSignup, setLoginOrSignup] = useState<authState>(null);
	const [account, setAccount] = useState<accountType>(empty_account);


	const changeState: (newState: authState) => void  = (newState) => {
		setLoginOrSignup(newState);
	}

	const changeAccount: (newAccount: any) => void = (newAccount) => {
		setAccount({...account, ...newAccount});
	}

	const unlog: () => void = () => {
		changeState(null);
		changeAccount(empty_account);
	}

  if (loginOrSignup !== "done") {
      return (<Authentification account={account} changeAccount={changeAccount} changeState={changeState} unlog={unlog} loginOrSignup={loginOrSignup}/>)
  } else {
    return (
      <Box>
        <Box className={classes.root}>
          <AppBars />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {/* <Route path="/" exact><Home/></Route> */}
              <Route path="/game"><Game account={account} changeAccount={changeAccount}/></Route>
              <Route path="/profile"><Profile account={account} changeAccount={changeAccount} unlog={unlog}/></Route>
              <Route path="/chat"><ChatChannelsView account={account} changeAccount={changeAccount}/></Route>
              <Route path="/leaderboard" component={Leaderboard} />
              <Route component={PageNotFound} />
            </Switch>
          </main>
        </Box>
        {/* <Footer /> */}
      </Box>
    )
  }
}

export default App
