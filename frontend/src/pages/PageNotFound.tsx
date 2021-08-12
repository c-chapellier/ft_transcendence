import React from 'react'
import { Grid } from '@material-ui/core'
import { Typography } from '@material-ui/core'

const PageNotFound = (): JSX.Element => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography variant='h1'>404</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h4' color='secondary'>Page not found</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h6'>Go back to home page or refresh this page in a hopeless way</Typography>
      </Grid>
    </Grid>
  )
}

export default PageNotFound
