import React from 'react'
import classNames from 'classnames'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import { useState } from 'react'
import { CssBaseline } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const drawerWidth = 180

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    menuButtonIconClosed: {
      transition: theme.transitions.create(['transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      transform: 'rotate(0deg)'
    },
    menuButtonIconOpen: {
      transition: theme.transitions.create(['transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      transform: 'rotate(180deg)'
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(0) * 7 + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(0) * 9 + 1
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      marginTop: theme.spacing(0),
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    grow: {
      flexGrow: 1,
      cursor: 'pointer',
    }
  })
)

interface SideBarItem {
  name: string
  route: string
}

const AppBars = (): JSX.Element => {
  const classes = useStyles()
  const history = useHistory()

  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const sideBarItems: SideBarItem[] = [
    // {
    //   name: 'Menu',
    //   route: '/'
    // },
    {
      name: 'Play',
      route: '/game'
    },
    {
      name: 'Chat',
      route: '/chat'
    },
    // {
    //   name: 'Stats',
    //   route: '/stats'
    // },
    {
      name: 'LeaderBoard',
      route: '/leaderboard'
    },
  ]

  return (
    <div>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar disableGutters={true}>
          <IconButton
            color='inherit'
            aria-label='Open drawer'
            onClick={() => { setOpenSideBar(!openSideBar) }}
            className={classes.menuButton}
          >
            <MenuIcon classes={{ root: openSideBar ? classes.menuButtonIconOpen : classes.menuButtonIconClosed }} />
          </IconButton>
          <Typography
            variant='h6'
            color='inherit'
            className={classes.grow}
            noWrap
            onClick={() => { history.push('/') }}
          >
            Transcendance
          </Typography>
          <IconButton
            aria-haspopup='true'
            onClick={() => { history.push('/profile') }}
            color='inherit'
          >
            <AccountCircle />
          </IconButton >
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={classNames(classes.drawer, { [classes.drawerOpen]: openSideBar, [classes.drawerClose]: !openSideBar })}
        classes={{ paper: classNames({ [classes.drawerOpen]: openSideBar, [classes.drawerClose]: !openSideBar }) }}
        open={openSideBar}
      >
        <div className={classes.toolbar} />
        <List>
          {sideBarItems.map((sideBarItem) => (
            <ListItem
              button
              key={sideBarItem.name}
              onClick={() => {
                history.push(sideBarItem.route)
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={sideBarItem.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>

  )
}

export default AppBars
