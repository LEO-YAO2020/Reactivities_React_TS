import { Container, List } from 'semantic-ui-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import styles from './App.module.scss'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    agent.Activities.list().then((res) => {
      let activities: Activity[] = []
      res.forEach((activity) => {
        activity.date = activity.date.split('T')[0]
        activities.push(activity)
      })
      setActivities(activities)
      setLoading(false)
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
    setSubmitting(true)
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter((x) => x.id !== activity.id), activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    } else {
      activity.id = uuid()
      agent.Activities.create(activity).then((res) => {
        setActivities([...activities, activity])
        setSelectedActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
    activity.id
      ? setActivities([...activities.filter((item) => item.id !== activity.id), activity])
      : setActivities([...activities, { ...activity, id: uuid() }])
    setEditMode(false)
    setSelectedActivity(activity)
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true)
    agent.Activities.delete(id).then((res) => {
      setActivities([...activities.filter((item) => item.id !== id)])
      setSubmitting(false)
    })
  }

  if (loading) {
    return <LoadingComponent content='Loading' />
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
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </List>
      </Container>
    </>
  )
}

export default App
