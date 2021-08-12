import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '85vh'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '73vh',
    overflowY: 'auto'
  },
  selectedChat: {
    backgroundImage: 'linear-gradient(to right, white 25%, lightgreen)'
  },
})

const Chat = (): JSX.Element => {
  const classes = useStyles()
  const [selectedChat, setSelectedChat] = useState<string>('')
  const [searchInput, setSearchInput] = useState<string>('')

  const myChat = {
    name: 'Me',
    user: 'Me',
    avatar: 'https://material-ui.com/static/images/avatar/4.jpg',
    status: 'online',
  }

  const chats = [
    {
      name: 'Remy Sharp',
      user: 'Remy Sharp',
      avatar: 'https://material-ui.com/static/images/avatar/1.jpg',
      status: 'online',
    },
    {
      name: 'Alice',
      user: 'Alice',
      avatar: 'https://material-ui.com/static/images/avatar/2.jpg',
      status: 'offline',
    },
    {
      name: 'Mat',
      user: 'Mat',
      avatar: 'https://material-ui.com/static/images/avatar/3.jpg',
      status: 'playing',
    },
  ]

  const msgs = [
    {
      value: 'Salut',
      sender: 'Moi',
      time: '08:34',
    },
    {
      value: 'Salut toi',
      sender: 'Pas Moi',
      time: '08:35',
    },
    {
      value: 'Jtm',
      sender: 'Moi',
      time: '08:36',
    },
    {
      value: 'Pas moi',
      sender: 'Pas Moi',
      time: '08:37',
    },
  ]

  return (
    <Grid container component={Paper} className={classes.chatSection}>
      <Grid item xs={3} className={classes.borderRight500}>
        <List>
          <ListItem
            button
            key={myChat.name}
            className={myChat.name === selectedChat ? classes.selectedChat : undefined}
            onClick={() => {
              setSelectedChat(myChat.name)
            }}
          >
            <ListItemIcon>
              <Avatar alt={myChat.user} src={myChat.avatar} />
            </ListItemIcon>
            <ListItemText primary={myChat.user}>{myChat.user}</ListItemText>
          </ListItem>
        </List>
        <Divider />
        <Grid item xs={12} style={{padding: '10px'}}>
          <TextField
            id="outlined-basic-email"
            label="Search"
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(event.target.value)
            }}
          />
        </Grid>
        <Divider />
        <List>
          {chats.map((chat) => {
            if (searchInput === '' || chat.name.toLowerCase().includes(searchInput.toLowerCase())) {
              return (
                <ListItem
                  button
                  key={chat.name}
                  className={chat.name === selectedChat ? classes.selectedChat : undefined}
                  onClick={() => {
                    setSelectedChat(chat.name)
                  }}
                >
                  <ListItemIcon>
                    <Avatar alt={chat.user} src={chat.avatar} />
                  </ListItemIcon>
                  <ListItemText primary={chat.user}>{chat.user}</ListItemText>
                  <ListItemText secondary={chat.status} style={{textAlign: 'right'}}/>
                </ListItem>
              )
            }
          })}
        </List>
      </Grid>
      <Grid item xs={9}>
        <List className={classes.messageArea}>
          {msgs.map((msg, id) => (
            <ListItem key={id}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText primary={msg.value} style={{textAlign: msg.sender === 'Moi' ? 'right' : 'left'}}></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText secondary={msg.time} style={{textAlign: msg.sender === 'Moi' ? 'right' : 'left'}}></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Grid container style={{padding: '20px'}}>
          <Grid item xs={11}>
            <TextField id="outlined-basic-email" label={`Send to ${selectedChat}`} fullWidth />
          </Grid>
          <Grid xs={1}>
            <Fab color="primary" aria-label="add" size='small'><SendIcon /></Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Chat
