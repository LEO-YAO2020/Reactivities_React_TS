import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[]
  selectActivity: (id: string) => void
}

const ActivityList: React.FC<Props> = ({ activities, selectActivity }) => {
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
                      selectActivity(item.id)
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
