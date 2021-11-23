import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import styles from './App.module.scss'
import { observer } from 'mobx-react-lite'
import { Route, Switch, useLocation } from 'react-router-dom'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import ActivityForm from '../../features/activities/form/ActivityForm'
import HomePage from '../../features/activities/pages/homePage'
import ActivityDetails from '../../features/activities/details/ActivityDetails'
import { ToastContainer } from 'react-toastify'
import NotFound from '../../features/errors/NotFound'
import TestErrors from '../../features/errors/TestError'
import LoginForm from '../../features/users/LoginForm'
import { useStore } from '../stores/store'
import { useEffect } from 'react'
import LoadingComponent from './LoadingComponent'
import ModalContainer from '../common/modals/ModalContainer'
import ProfilePage from '../../features/profiles/ProfilePage'

function App() {
  const location = useLocation()
  const { commonStore, userStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) {
    return <LoadingComponent content='Loading app...' />
  }
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className={styles.container}>
              <Switch>
                <Route path='/activities' component={ActivityDashboard} exact />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route path='/profiles/:username' component={ProfilePage} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path={'/testError'} component={TestErrors} />
                <Route path={'/login'} component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default observer(App)
