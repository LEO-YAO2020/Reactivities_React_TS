import { Container, List } from 'semantic-ui-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import styles from './App.module.scss'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

function App() {
  const { activityStore } = useStore()

  const [activities, setActivities] = useState<Activity[]>([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])



  const handleDeleteActivity = (id: string) => {
    setSubmitting(true)
    agent.Activities.delete(id).then((res) => {
      setActivities([...activities.filter((item) => item.id !== id)])
      setSubmitting(false)
    })
  }

  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading' />
  }
  return (
    <>
      <NavBar />
      <Container className={styles.container}>

        <List>
          <ActivityDashboard
            activities={activityStore.activities}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </List>
      </Container>
    </>
  )
}

export default observer(App)
