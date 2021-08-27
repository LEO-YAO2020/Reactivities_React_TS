import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

const ActivityFilter = () => {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
        <Header icon='filter' attached color='teal' content='Filter' />
        <Menu.Item content='All Activities' />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm hosting" />
      </Menu>
      <Header />
      <Calendar />
    </>
  )
}

export default ActivityFilter
