import Axios from 'axios'
import { Container, List } from 'semantic-ui-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import styles from './App.module.scss'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
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

  const handleFormOpen = (id?: string) => {
    id ? handleSelectedActivity(id) : handleCancelSelectActivity()
    setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([...activities.filter((item) => item.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectedActivity(activity)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((item) => item.id !== id)])
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container className={styles.container}>
        <List>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectedActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditActivity}
            deleteActivity = {handleDeleteActivity}
          />
        </List>
      </Container>
    </>
  )
}

export default App
