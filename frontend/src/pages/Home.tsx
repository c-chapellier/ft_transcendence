import React from 'react'
import { User } from '../interfaces/IGlobal'
import { getAllUsers } from '../api/UserService'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

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

const Home = (): JSX.Element => {
  const classes = useStyles()

  const [ items, setItems ] = React.useState<User[]>([])

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await getAllUsers()
        setItems(res)
      } catch(e) {
        console.log('e', e)
      }
    }
    fetchItems()
  }, [])


  return (
    <div className={classes.home}>
      <Box className={classes.body}>
        {items.map((item) => (
          <div key={item.id}>
            <p>{`id: ${item.id}`}</p>
            <p>{`name: ${item.name}`}</p>
            <p>{`description: ${item.description}`}</p>
          </div>
        ))}
      </Box>
    </div>
  )
}

export default Home
