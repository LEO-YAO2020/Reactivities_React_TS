import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { Grid, Loader } from 'semantic-ui-react'
import { PagingParams } from '../../../app/models/pagination'
import { useStore } from '../../../app/stores/store'
import ActivityFilter from './ActivityFilter'
import ActivityList from './ActivityList'
import ActivityListItemPlaceholder from './ActivityListPlaceholder'

const ActivityDashboard: React.FC = () => {
  const { activityStore } = useStore()
  const { loadActivities, activitiesRegistry, setPagingParams, pagination } = activityStore
  const [loadingNext, setLoadingNext] = useState(false)
  useEffect(() => {
    if (activitiesRegistry.size <= 1) loadActivities()
  }, [activitiesRegistry.size, activityStore, loadActivities])

  function handleGetNext() {
    setLoadingNext(true)

    setPagingParams(new PagingParams(pagination!.currentPage + 1))
    loadActivities().then(() => setLoadingNext(false))
  }

  return (
    <Grid>
      <Grid.Column width='10'>
        {activityStore.loadingInitial && !loadingNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            hasMore={!loadingNext && !!pagination && pagination!.totalPages > pagination!.currentPage}
            loadMore={handleGetNext}
            initialLoad={false}
            
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilter />
      </Grid.Column>
      <Grid.Column width='10'>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
