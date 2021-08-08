import React from 'react'
import NavBar from '../components/NavBar'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Footer from '../components/Footer'

const useStyles = makeStyles(() =>
  createStyles({
    home: {
      backgroundColor: 'yellow',
    },
    body: {
      backgroundColor: 'red',
    },
  })
)

const PageNotFound = (): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.home}>
      <NavBar />
      <Box className={classes.body}>
        Page not found
      </Box>
      <Footer title="Transcendance" description="A really good website" />
    </div>
  )
}

export default PageNotFound
