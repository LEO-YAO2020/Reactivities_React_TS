import { Container, List } from 'semantic-ui-react'
import { useEffect } from 'react'
import NavBar from './NavBar'
import styles from './App.module.scss'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

function App() {
  const { activityStore } = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])


  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading' />
  }
  return (
    <>
      <NavBar />
      <Container className={styles.container}>
        <List>
          <ActivityDashboard />
        </List>
      </Container>
    </>
  )
}

export default observer(App)
