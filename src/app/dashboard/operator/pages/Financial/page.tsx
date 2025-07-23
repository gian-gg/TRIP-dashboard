import { useState } from 'react';
import ReportCard from '@/components/ReportCard';
import { Progress } from '@/components/ui/progress';
import PieGraph from './components/PieGraph';
import RadarGraph from './components/RadarGraph';
import Container from '@/components/ui/Container';

import FilterDate from '@/components/FilterDate';

import { TrendingUp, User } from 'lucide-react';

import type { FilterDateType } from '@/type';

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
  const [selectedDate, setSelectedDate] = useState<FilterDateType | undefined>(
    undefined
  );

  return (
    <>
      <h1 className="text-xl font-bold">Financial</h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        This page provides an overview of the financial performance and key
        metrics.
      </p>
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
          <span className="text-4xl font-extrabold md:text-6xl">$67,000</span>
          <p className="text-muted-foreground text-[10px] md:text-xs lg:text-sm">
            Total income generated.
          </p>
          <div className="mt-4 flex items-center justify-between gap-2 text-xs md:text-sm">
            <p>P2343</p>
            <Progress value={75} className="h-2" />
            <p>P234</p>
          </div>
        </Container>
        <div className="grid w-full grid-cols-2 grid-rows-2 gap-4">
          <MiniCard
            title="Regular"
            value="P2343"
            subtitle="Lorem ipsum dolor sit amet."
          />
          <MiniCard
            title="Student"
            value="P2343"
            subtitle="Lorem ipsum dolor sit amet."
          />
          <MiniCard
            title="Senior"
            value="P2343"
            subtitle="Lorem ipsum dolor sit amet."
          />
          <MiniCard
            title="PWD"
            value="P2343"
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
          <PieGraph />
        </ReportCard>
        <ReportCard
          header={{
            title: 'Passenger Types',
            description: 'Distribution of passenger types',
          }}
        >
          <RadarGraph />
        </ReportCard>
      </div>
    </>
  );
};

export default Financial;
