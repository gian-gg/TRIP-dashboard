import '@/globals.css';
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Loading from '@/components/Loading';

const Home = lazy(() => import('@/app/home/page'));
const Dashboard = lazy(() => import('@/app/dashboard/page'));
const NotFound = lazy(() => import('@/app/NotFound'));
const Overview = lazy(() => import('@/app/dashboard/Pages/Overview/page'));
const Financial = lazy(() => import('@/app/dashboard/Pages/Financial/page'));
const FleetStatus = lazy(
  () => import('@/app/dashboard/Pages/FleetStatus/page')
);
const BusRoutes = lazy(() => import('@/app/dashboard/Pages/BusRoutes/page'));
const Maintenance = lazy(
  () => import('@/app/dashboard/Pages/Maintenance/page')
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="financial" element={<Financial />} />
            <Route path="fleetStatus" element={<FleetStatus />} />
            <Route path="busRoutes" element={<BusRoutes />} />
            <Route path="maintenance" element={<Maintenance />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
    <Toaster richColors />
  </StrictMode>
);
