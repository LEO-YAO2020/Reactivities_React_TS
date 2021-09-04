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

function App() {
  const location = useLocation()
  return (
    <>
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <ToastContainer position='bottom-right' hideProgressBar />
            <NavBar />
            <Container className={styles.container}>
              <Switch>
                {/* any roots that match the forward slash plus something else is going to mach this */}
                <Route path='/activities' component={ActivityDashboard} exact />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Route path={'/testError'} component={TestErrors} />
                <Route  component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default observer(App)
