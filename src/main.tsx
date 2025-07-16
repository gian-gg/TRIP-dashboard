import '@/globals.css';
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loading from '@/components/Loading';

const Home = lazy(() => import('@/app/home/page'));
const OperatorDashboard = lazy(() => import('@/app/dashboard/operator/page'));
const NotFound = lazy(() => import('@/app/NotFound'));
const Overview = lazy(
  () => import('@/app/dashboard/operator/pages/Overview/page')
);
const Financial = lazy(
  () => import('@/app/dashboard/operator/pages/Financial/page')
);
const Operations = lazy(
  () => import('@/app/dashboard/operator/pages/Operations/page')
);
const BusRoutes = lazy(
  () => import('@/app/dashboard/operator/pages/BusRoutes/page')
);

const ConductorDashboard = lazy(() => import('@/app/dashboard/conductor/page'));
const Upload = lazy(() => import('@/app/dashboard/conductor/pages/Upload'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/operator/*" element={<OperatorDashboard />}>
            <Route index element={<Overview />} />
            <Route path="financial" element={<Financial />} />
            <Route path="operations" element={<Operations />} />
            <Route path="busRoutes" element={<BusRoutes />} />
            <Route path="*" element={<Overview />} />
          </Route>
          <Route path="/conductor/*" element={<ConductorDashboard />}>
            <Route index element={<Upload />} />
            <Route path="*" element={<Upload />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
    <Toaster richColors />
  </StrictMode>
);
