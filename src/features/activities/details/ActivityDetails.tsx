import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/Layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import ActivityDetailedInfo from './ActicvityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'
import ActivityDetailHeader from './ActivityDetailHeader'

const ActivityDetails: React.FC = () => {
  const { activityStore } = useStore()
  const { selectedActivity: activity, loadActivity, loadingInitial, clearSelectedActivity } = activityStore
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) loadActivity(id)
    return () => clearSelectedActivity()
  }, [clearSelectedActivity, id, loadActivity])

  if (loadingInitial || !activity) {
    return <LoadingComponent />
  }
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activityId={activity.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDetails)
