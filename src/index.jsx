import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { adminApiService } from './services/AdminApiService';

const container = document.getElementById('app');

const root = ReactDOM.createRoot(container);

const data = localStorage.getItem('accessToken');
const accessToken = JSON.parse(data);

adminApiService.setAccessToken(accessToken);

root.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
));
