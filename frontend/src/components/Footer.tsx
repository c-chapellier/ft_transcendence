import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { AppBar, Toolbar } from '@material-ui/core'

const Footer = (): JSX.Element => {
  return (
    <AppBar position="static" color="primary" style={{
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 9999,
    }}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; 2021 Transcendance
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Footer
