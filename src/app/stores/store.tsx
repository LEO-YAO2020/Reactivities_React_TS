import { createContext, useContext } from 'react'
import ActivityStore from './activityStore'
import CommentStore from './commentStore'
import CommonStore from './commonStore'
import ModalStore from './modalStore'
import ProfileStore from './profileStore'
import UserStore from './userStore'

interface Store {
  activityStore: ActivityStore
  userStore: UserStore
  commonStore: CommonStore
  modalStore: ModalStore
  profileStore:ProfileStore
  commentStore:CommentStore
}

export const store: Store = {
  activityStore: new ActivityStore(),
  userStore: new UserStore(),
  commonStore: new CommonStore(),
  modalStore: new ModalStore(),
  profileStore:new ProfileStore(),
  commentStore:new CommentStore()
}

export const StoreContext = createContext(store)

export const MobxProvider: React.FC = (props) => {
  return <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
}

export function useStore() {
  return useContext(StoreContext)
}
