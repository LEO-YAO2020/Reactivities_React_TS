import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'
import styled from './NavBar.module.scss'

const NavBar: React.FC = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header exact>
          <img src='/assets/logo.png' alt='logo' className={styled.image} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activities' />
        <Menu.Item>
          <Button
            positive
            content='Create Activity'
            as={NavLink}
            to='/createActivity'
          />
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
