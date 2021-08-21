import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './app/Layout/App';
import { MobxProvider } from './app/stores/store';

ReactDOM.render(
  <MobxProvider>
    <App />
  </MobxProvider>,
  document.getElementById('root')
);
