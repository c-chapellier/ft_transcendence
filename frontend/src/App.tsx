import React from 'react'
import axios from 'axios'
import './App.css'

interface Item {
  id: string
  isActive: boolean
  isArchived: boolean
  createDateTime: Date
  createdBy: string
  lastChangedDateTime: Date
  lastChangedBy: string
  internalComment: string | null
  name: string
  description: string
}

function App() {

  const [ items, setItems ] = React.useState<Item[]>([])

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:3001/item', { headers: { accept: '*/*' } })
        console.log('res', res)
        setItems(res.data)
      } catch(e) {console.log('e', e)}
    }
    fetchItems()
  }, [])


  return (
    <div className="App">
      {items.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  )
}

export default App;
