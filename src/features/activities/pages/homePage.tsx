import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const HomePage: React.FC = () => {
  return (
    <div>
      <Container style={{ marginTop: '7em' }}>
        HomePage
        <h3>
          GO TO <Link to='/activities'>Activities</Link>
        </h3>
      </Container>
    </div>
  )
}

export default HomePage
