import '@/globals.css';
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loading from '@/components/Loading';

const Home = lazy(() => import('@/app/home/page'));
const Dashboard = lazy(() => import('@/app/dashboard/page'));
const NotFound = lazy(() => import('@/app/NotFound'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
    <Toaster richColors />
  </StrictMode>
);
