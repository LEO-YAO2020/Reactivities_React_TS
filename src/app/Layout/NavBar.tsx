import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'
import styled from './NavBar.module.scss'

const NavBar: React.FC = () => {
  const {
    userStore: { user, logout }
  } = useStore()
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header exact>
          <img src='/assets/logo.png' alt='logo' className={styled.image} />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activities' />
        <Menu.Item>
          <Button positive content='Create Activity' as={NavLink} to='/createActivity' />
        </Menu.Item>
        <Menu.Item position='right'>
          <Image src={user?.Image || '/assets/user.png'} avatar spaced='right' />
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profile/${user?.userName}`} text='My Profile' icon='user' />
              <Dropdown.Item onClick={logout} text='Logout' icon='power' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default observer(NavBar)
