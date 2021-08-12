import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles({
  profileSection: {
    width: '100%',
    height: '85vh'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  avatar: {
    width: '15vw',
    height: '15vw',
  },
})

interface User {
  name: string,
  description: string,
  avatar: string,
  status: string,
  level: number,
  nbrVictory: number,
  nbrLoss: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const Profile = (): JSX.Element => {
  const classes = useStyles()

  const user: User = {
    name: 'Corentin',
    description: 'Un sacré bg',
    avatar: 'https://material-ui.com/static/images/avatar/4.jpg',
    status: 'online',
    level: 18,
    nbrVictory: 34,
    nbrLoss: 45,
  }

  const displayedFields = [
    'name',
    'level',
    'nbrVictory',
    'nbrLoss',
  ]

  const matchs = [
    { name: 'France vs Suisse', result: 'Win'},
    { name: 'Belgique vs Italie', result: 'Loose'},
    { name: 'Italie vs Peru', result: 'Win'},
  ]

  const getUserField = (field: string) => {
    switch (field) {
    case 'name':
      return 'Name'
    case 'level':
      return 'Level'
    case 'nbrVictory':
      return 'Victory count'
    case 'nbrLoss':
      return 'Loss count'
    default:
      return null
    }
  }

  return (
    <Grid container component={Paper} className={classes.profileSection}>
      <Grid item className={classes.borderRight500}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar alt={user.name} src={user.avatar} className={classes.avatar}/>
            </ListItemIcon>
          </ListItem>
          <ListItem>
            <ListItemText primary={user.name}/>
          </ListItem>
          <ListItem>
            <ListItemText secondary={user.description}/>
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={9}>
        <List>
          {displayedFields.map((field) => (
            <ListItem key={field}>
              <Grid container spacing={2}>
                <Grid item>
                  <ListItemText primary={getUserField(field)}/>
                </Grid>
                <Grid item>
                  <ListItemText secondary={user[field]}/>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {matchs.map((match) => (
            <ListItem key={match.name}>
              <Grid container spacing={2}>
                <Grid item>
                  <ListItemText primary={match.name}/>
                </Grid>
                <Grid item>
                  <ListItemText secondary={match.result}/>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  )
}

export default Profile
