import { observer } from 'mobx-react-lite'
import React from 'react'
import { Tab } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import ProfileFollowings from './ProfileFollowings'
import ProfilePhoto from './ProfilePhoto'

interface Props {
  profile: Profile
}
const ProfileContent = ({ profile }: Props) => {
  const { profileStore } = useStore()
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
        return <ProfilePhoto profile={profile} />
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
        return <ProfileFollowings />
      }
    },
    {
      menuItem: 'Following',
      render: () => {
        return <ProfileFollowings />
      }
    }
  ]
  return (
    <Tab
      panes={panes}
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  )
}

export default observer(ProfileContent)
