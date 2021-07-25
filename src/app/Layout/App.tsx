import Axios from 'axios'
import { Container, List } from 'semantic-ui-react'
import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import styles from './App.module.scss'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  useEffect(() => {
    Axios.get<Activity[]>('http://localhost:5000/api/activities').then((res) => {
      setActivities(res.data)
    })
  }, [])

  function handleSelectedActivity(id: string) {
    setSelectedActivity(activities.find((activity) => activity.id === id))
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  return (
    <>
      <NavBar />
      <Container className={styles.container}>
        <List>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectedActivity}
            cancelSelectActivity={handleCancelSelectActivity}
          />
        </List>
      </Container>
    </>
  )
}

export default App
