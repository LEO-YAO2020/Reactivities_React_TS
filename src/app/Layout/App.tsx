import Axios from 'axios'
import { Container, List } from 'semantic-ui-react'
import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import styles from './App.module.scss'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  useEffect(() => {
    Axios.get<Activity[]>('http://localhost:5000/api/activities').then((res) => {
      setActivities(res.data)
    })
  }, [])
  return (
    <>
      <NavBar/>
      <Container className={styles.container}>
        <List>
        {activities.map((act) => (
          <List.Item key={act.id}>{act.title}</List.Item>
        ))}
      </List>
      </Container>
      
    </>
  )
}

export default App
