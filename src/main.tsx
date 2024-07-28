import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Suspense } from 'react';
import ErrorBoundary from './utils/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div>loading...</div>}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Suspense>,
);
