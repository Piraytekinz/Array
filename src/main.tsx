// index.tsx or main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-2V8R6QX5NN')

// ReactGA.initialize('G-0B7XXLSR0R')


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
