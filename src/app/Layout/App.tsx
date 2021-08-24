import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import styles from './App.module.scss'
import { observer } from 'mobx-react-lite'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import ActivityForm from '../../features/activities/form/ActivityForm'
import HomePage from '../../features/activities/pages/homePage'
import ActivityDetails from '../../features/activities/details/ActivityDetails'

function App() {
  const location = useLocation()
  return (
    <>
      <Route path='/' component={HomePage} exact />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className={styles.container}>
              <Switch>
                {/* any roots that match the forward slash plus something else is going to mach this */}
                <Route path='/activities' component={ActivityDashboard} exact />
                <Route path='/activities/:id' component={ActivityDetails} />
                <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} />
                <Redirect to='/' />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default observer(App)
