import { observer } from 'mobx-react-lite'
import React from 'react'
import { Tab } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import ProfilePhoto from './ProfilePhoto'


interface Props{
  profile:Profile
}
const ProfileContent = ({profile}:Props) => {
  const panes = [
    {
      menuItem: 'About',
      render: () => {
        return <Tab.Pane>About Content</Tab.Pane>
      }
    },
    {
      menuItem: 'Photos',
      render: () => {
        return <ProfilePhoto profile = {profile}/>
      }
    },
    {
      menuItem: 'Evens',
      render: () => {
        return <Tab.Pane>Events Content</Tab.Pane>
      }
    },
    {
      menuItem: 'Followers',
      render: () => {
        return <Tab.Pane>Followers Content</Tab.Pane>
      }
    },
    {
      menuItem: 'Following',
      render: () => {
        return <Tab.Pane>Following Content</Tab.Pane>
      }
    }
  ]
  return <Tab panes={panes} menu={{ fluid: true, vertical: true }} menuPosition='right' />
}

export default observer(ProfileContent)
