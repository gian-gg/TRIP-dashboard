import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ReportCard from '@/components/ReportCard';
import { DollarSign, Users, UsersRound, Route, Printer } from 'lucide-react';
import LineGraph from './components/LineGraph';
import { generateOverviewPrintReport } from './utils/print';
import Cards from '@/components/Cards';
import FilterDate from '@/components/FilterDate';
import { getUser } from '@/lib/auth';

import APICall from '@/lib/api';

import type { FilterDateType, UserType } from '@/type';

interface OverviewCardType {
  revenue: string;
  total_passengers: string;
  average_passenger_per_trip: string;
  total_trip: string;
  division: { x: string; ridership: string; revenue: string }[];
}

const Overview = () => {
  const [overviewData, setOverviewData] = useState<OverviewCardType | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<FilterDateType | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      const user = (await getUser()) as UserType | null;

      if (!user) {
        toast.error('User not found. Please log in again.');
        return;
      }

      const API_URL =
        selectedDate?.start && selectedDate?.end && selectedDate?.type
          ? `/company/index.php?company_id=${user.company_id}&start_time=${selectedDate.start}&end_time=${selectedDate.end}&type=${selectedDate.type}`
          : `/company/index.php?company_id=${user.company_id}`;

      await APICall<OverviewCardType>({
        type: 'GET',
        url: API_URL,
        consoleLabel: API_URL,
        success: (data) => {
          setOverviewData(data);
        },
        error: (error) => {
          toast.error(error.message || 'Unknown error');
        },
      });
    };

    fetchData();
  }, [selectedDate]);

  const handlePrint = () => {
    generateOverviewPrintReport(overviewData);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Overview</h1>
          <p className="text-muted-foreground text-xs md:text-sm">
            This page provides an overview of the dashboard's key metrics.
          </p>
        </div>
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print PDF
        </Button>
      </div>
      <FilterDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Cards
          card={{
            title: 'Total Revenue',
            icon: DollarSign,
            value: '₱' + (Number(overviewData?.revenue) || 0).toFixed(2),
            subtitle: 'July 24th, 2025',
          }}
        />
        <Cards
          card={{
            title: 'Total Passengers',
            icon: Users,
            value: (Number(overviewData?.total_passengers) || 0).toFixed(2),
            subtitle: 'July 24th, 2025',
          }}
        />
        <Cards
          card={{
            title: 'Average Passengers per Trip',
            icon: UsersRound,
            value: (
              Number(overviewData?.average_passenger_per_trip) || 0
            ).toFixed(2),
            subtitle: 'July 24th, 2025',
          }}
        />
        <Cards
          card={{
            title: 'Total Trips',
            icon: Route,
            value: (Number(overviewData?.total_trip) || 0).toFixed(2),
            subtitle: 'July 24th, 2025',
          }}
        />
      </div>

      {overviewData && overviewData.division && (
        <div className="flex max-h-1/2 w-full flex-col gap-4 md:flex-row">
          <ReportCard
            header={{
              title: 'Revenue & Ridership Trends',
              description: 'Monthly performance over the last 6 months',
            }}
            link="/operator/financial"
            className="md:w-full"
          >
            <LineGraph chartData={overviewData.division} />
          </ReportCard>
        </div>
      )}
    </>
  );
};

export default Overview;
