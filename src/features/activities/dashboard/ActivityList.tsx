import { observer } from 'mobx-react-lite'
import React, { Fragment } from 'react'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityListItem from './ActivityListItem'

const ActivityList: React.FC = () => {
  const { activityStore } = useStore()
  const { groupActivities } = activityStore
  return (
    <>
      {groupActivities.map(([group, activities], index) => (
        <Fragment key={group}>
          <Header sub color='teal'>
            {group}
          </Header>
          {activities.map((item) => {
            return <ActivityListItem activity={item} key={item.id} />
          })}
        </Fragment>
      ))}
    </>
  )
}

export default observer(ActivityList)
