import { Button, Container, Menu } from "semantic-ui-react"
import styled from  './NavBar.module.scss'

const NavBar = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" className={styled.image}/>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities"/>
        <Menu.Item>
          <Button positive content="Create Activity"/>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
