import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import ReportCard from '@/components/ReportCard';
import { Progress } from '@/components/ui/progress';
import PieGraph from './components/PieGraph';
import RadarGraph from './components/RadarGraph';
import { generateFinancialPrintReport } from './utils/print';
import Container from '@/components/ui/Container';
import { getUser } from '@/lib/auth';
import APICall from '@/lib/api';

import FilterDate from '@/components/FilterDate';

import { TrendingUp, User, Printer } from 'lucide-react';

import type { FilterDateType, UserType } from '@/type';

interface FinancialDataType {
  gross_revenue: string;
  total_passengers: string;
  payment_mode_breakdown: {
    method: 'cash' | 'online';
    percentage: number;
    count: number;
    revenue: number;
  }[];
  passenger_category_breakdown: {
    type: 'regular' | 'student' | 'senior' | 'pwd';
    percentage: number;
    count: number;
    revenue: number;
  }[];
}

const MiniCard = (props: {
  title: string;
  value: string;
  subtitle: string;
}) => {
  return (
    <Container className="w-full !p-3">
      <div className="flex justify-between">
        <h1 className="text-[10px] font-medium">{props.title}</h1>
        <User className="text-muted-foreground h-4 w-4" />
      </div>
      <span className="text-xl font-extrabold md:text-2xl">{props.value}</span>
      <p className="text-muted-foreground text-[10px]">{props.subtitle}</p>
    </Container>
  );
};

const Financial = () => {
  const [data, setData] = useState<FinancialDataType | null>(null);
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
        selectedDate?.start && selectedDate?.end
          ? `/financial/index.php?company_id=${user.company_id}&start_time=${selectedDate.start}&end_time=${selectedDate.end}`
          : `/financial/index.php?company_id=${user.company_id}`;

      await APICall<FinancialDataType>({
        type: 'GET',
        url: API_URL,
        consoleLabel: API_URL,
        success: (response) => {
          setData(response);
        },
        error: (error) => {
          toast.error(error.message || 'Unknown error');
        },
      });
    };

    fetchData();
  }, [selectedDate]);

  const handlePrint = () => {
    generateFinancialPrintReport(data);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Financial</h1>
          <p className="text-muted-foreground text-xs md:text-sm">
            This page provides an overview of the financial performance and key
            metrics.
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
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Container className="w-full md:w-1/2">
          <div className="flex justify-between">
            <h1 className="text-xs font-medium md:text-sm lg:text-lg">
              Monthly Revenue
            </h1>
            <TrendingUp className="text-muted-foreground h-6 w-6 md:h-8 md:w-8" />
          </div>
          <span className="text-4xl font-extrabold md:text-6xl">
            ₱{data?.gross_revenue || '0.00'}
          </span>
          <p className="text-muted-foreground text-[10px] md:text-xs lg:text-sm">
            Total income generated.
          </p>
          <div className="mt-4 flex items-center justify-between gap-2 text-xs md:text-sm">
            <p>₱{data?.payment_mode_breakdown[1]?.revenue || '0'}</p>
            <Progress
              value={data?.payment_mode_breakdown[1]?.revenue}
              className="h-2"
            />
            <p>₱{data?.payment_mode_breakdown[0]?.revenue || '0'}</p>
          </div>
        </Container>
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-4">
          <MiniCard
            title="Regular"
            value={`₱${(Number(data?.passenger_category_breakdown[0]?.revenue) || 0).toFixed(2)}`}
            subtitle="Lorem ipsum dolor sit amet."
          />
          <MiniCard
            title="Senior"
            value={`₱${(Number(data?.passenger_category_breakdown[1]?.revenue) || 0).toFixed(2)}`}
            subtitle="Lorem ipsum dolor sit amet."
          />
          <MiniCard
            title="PWD"
            value={`₱${(Number(data?.passenger_category_breakdown[2]?.revenue) || 0).toFixed(2)}`}
            subtitle="Lorem ipsum dolor sit amet."
          />
          <MiniCard
            title="Student"
            value={`₱${(Number(data?.passenger_category_breakdown[3]?.revenue) || 0).toFixed(2)}`}
            subtitle="Lorem ipsum dolor sit amet."
          />
        </div>
      </div>
      <div className="flex max-h-1/2 w-full flex-col gap-4 md:flex-row">
        <ReportCard
          header={{
            title: 'Payment Methods',
            description: 'Distribution of payment methods used',
          }}
        >
          <PieGraph
            data={[
              {
                method: 'online',
                count: data?.payment_mode_breakdown[1]?.revenue || 1,
                fill: 'var(--color-online)', // imlazy
              },
              {
                method: 'cash',
                count: data?.payment_mode_breakdown[0]?.revenue || 1,
                fill: 'var(--color-cash)', // imlazy
              },
            ]}
          />
        </ReportCard>
        <ReportCard
          header={{
            title: 'Passenger Types',
            description: 'Distribution of passenger types',
          }}
        >
          <RadarGraph
            data={[
              {
                type: 'Regular',
                count: data?.passenger_category_breakdown[0]?.count || 0,
              },
              {
                type: 'Senior',
                count: data?.passenger_category_breakdown[1]?.count || 0,
              },
              {
                type: 'PWD',
                count: data?.passenger_category_breakdown[2]?.count || 0,
              },
              {
                type: 'Student',
                count: data?.passenger_category_breakdown[3]?.count || 0,
              },
            ]}
          />
        </ReportCard>
      </div>
    </>
  );
};

export default Financial;
