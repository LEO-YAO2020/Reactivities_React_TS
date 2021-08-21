import { createContext, useContext } from 'react'
import ActivityStore from './activityStore'

interface Store {
  activityStore: ActivityStore
}

export const store: Store = {
  activityStore: new ActivityStore()
}

export const StoreContext = createContext(store)

export const MobxProvider:React.FC = (props)=>{
  return(
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  return useContext(StoreContext)
}