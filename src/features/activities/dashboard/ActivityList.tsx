import React from 'react'
import { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

interface Props {
  activities: Activity[]
  submitting: boolean
  deleteActivity: (id: string) => void
}

const ActivityList: React.FC<Props> = ({ activities, deleteActivity, submitting }) => {
  const [target, setTarget] = useState('')

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }
  const {activityStore} = useStore()
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((item) => {
          return (
            <Item key={item.id}>
              <Item.Content>
                <Item.Header as='a'>{item.title}</Item.Header>
                <Item.Meta>{item.date}</Item.Meta>
                <Item.Description>
                  <div>{item.description}</div>
                  <div>
                    {item.city}, {item.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated='right'
                    content='View'
                    color='blue'
                    onClick={() => {
                     activityStore.selectActivity(item.id)
                    }}
                  />
                  <Button
                    name={item.id}
                    loading={submitting && target === item.id}
                    floated='right'
                    content='Delete'
                    color='red'
                    onClick={(e) => {
                      handleActivityDelete(e, item.id)
                    }}
                  />
                  <Label basic content={item.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList
