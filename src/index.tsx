import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import 'react-calendar/dist/Calendar.css'
import './index.css'
import App from './app/Layout/App'
import { MobxProvider } from './app/stores/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <MobxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MobxProvider>,
  document.getElementById('root')
)
