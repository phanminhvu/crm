import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter /* , HashRouter */ } from 'react-router-dom';

// Register icon sprite
import 'virtual:svg-icons-register';
// css
import '@/assets/css/index.less';
// App
import App from '@/App';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
);
