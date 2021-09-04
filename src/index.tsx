import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import App from './app/Layout/App'
import { MobxProvider } from './app/stores/store'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory();

ReactDOM.render(
  <MobxProvider>
    <Router history={history}>
      <App />
    </Router>
  </MobxProvider>,
  document.getElementById('root')
)
