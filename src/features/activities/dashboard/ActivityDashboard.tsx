import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/Layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import ActivityFilter from './ActivityFilter'
import ActivityList from './ActivityList'

const ActivityDashboard: React.FC = () => {
  const { activityStore } = useStore()
  const { loadActivities, activitiesRegistry } = activityStore
  useEffect(() => {
    if(activitiesRegistry.size <= 1) loadActivities()
  }, [activitiesRegistry.size, activityStore, loadActivities])

  if (activityStore.loadingInitial) {
    return <LoadingComponent content='Loading' />
  }
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilter/>
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
