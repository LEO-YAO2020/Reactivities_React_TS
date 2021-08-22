import { observer } from 'mobx-react-lite'
import React from 'react'
import { SyntheticEvent } from 'react'
import { useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

const ActivityList: React.FC = () => {
  const { activityStore } = useStore()
  const { activitiesByDate, deleteActivity, loading } = activityStore
  const [target, setTarget] = useState('')

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((item) => {
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
                    loading={loading && target === item.id}
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

export default observer(ActivityList)
