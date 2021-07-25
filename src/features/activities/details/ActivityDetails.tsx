import { Button, Card, Image } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

const ActivityDetails: React.FC<{ activity: Activity; cancelSelectActivity: () => void }> = ({ activity,cancelSelectActivity }) => {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button basic color='blue' content='Edit' />
          <Button basic color='grey' content='Cancel' onClick={()=>cancelSelectActivity()}/>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails