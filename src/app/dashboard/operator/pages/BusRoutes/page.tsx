import { useState, useEffect } from 'react';
import { Printer } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ReportCard from '@/components/ReportCard';
import BarGraph from './components/BarGraph';
import { generateBusRoutesPrintReport } from './utils/print';
import Container from '@/components/ui/Container';
import { getUser } from '@/lib/auth';
import APICall from '@/lib/api';

import type { UserType } from '@/type';

interface RouteDataType {
  route_id: string;
  route_name: string;
  passengers: string; // daily
  daily_revenue: string;
  revenue_per_passenger: string;
}

const BusRoutes = () => {
  const [data, setData] = useState<RouteDataType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const user = (await getUser()) as UserType | null;

      if (!user) {
        toast.error('User not found. Please log in again.');
        return;
      }

      await APICall<RouteDataType[]>({
        type: 'GET',
        url: `/route/index.php?company_id=${user.company_id}`,
        consoleLabel: `/route/index.php?company_id=${user.company_id}`,
        success: (data) => {
          setData(data);
        },
        error: (error) => {
          toast.error(error.message || 'Unknown error');
        },
      });
    };

    fetchData();
  }, []);

  const handlePrint = () => {
    generateBusRoutesPrintReport(data);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Bus Routes</h1>
          <p className="text-muted-foreground text-xs md:text-sm">
            This page provides an overview of the bus routes and their key
            metrics.
          </p>
        </div>
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print PDF
        </Button>
      </div>

      <ReportCard
        header={{
          title: 'Route Performance',
          description: 'Passenger counts for each bus route',
        }}
        className="max-h-96 w-full"
      >
        <BarGraph
          data={
            data?.map((route) => ({
              route: 'Route ' + route.route_id,
              passengers: Number(route.passengers),
              fill: `var(--chart-${(Number(route.route_id) % 5) + 1})`,
            })) || []
          }
        />
      </ReportCard>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {data?.map((route, index) => (
          <Container key={index} className="p-4">
            <h2 className="mb-2 text-lg font-bold">
              {route.route_id} - {route.route_name}
            </h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="pr-2">Daily Passenger Count:</td>
                  <td className="font-semibold">{route.passengers}</td>
                </tr>
                <tr>
                  <td className="pr-2">Daily Revenue:</td>
                  <td className="font-semibold">₱{route.daily_revenue}</td>
                </tr>
                <tr>
                  <td className="pr-2">Revenue per Passenger:</td>
                  <td className="font-semibold">
                    ₱{route.revenue_per_passenger}
                  </td>
                </tr>
              </tbody>
            </table>
          </Container>
        ))}
      </div>
    </>
  );
};

export default BusRoutes;
