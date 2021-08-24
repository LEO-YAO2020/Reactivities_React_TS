import ReactDOM from 'react-dom'
import './index.css'
import 'semantic-ui-css/semantic.min.css'
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
