import { useState } from 'react';
import ReportCard from '@/components/ReportCard';
import { DollarSign, Users, Bus, Clock } from 'lucide-react';
import LineGraph from './components/LineGraph';
import BarGraph from './components/BarGraph';
import Cards from '@/components/Cards';
import FilterDate from '@/components/FilterDate';

import type { FilterDateType } from '@/type';

const pageData = {
  title: 'Overview',
  description: "This page provides an overview of the dashboard's key metrics.",
  overviewCards: [
    {
      title: 'Total Revenue',
      icon: DollarSign,
      value: '₱67,000',
      subtitle: 'Lorem ipsum dolor',
    },
    {
      title: 'Daily Passengers',
      icon: Users,
      value: '18,500',
      subtitle: 'Lorem ipsum dolor',
    },
    {
      title: 'Fleet Utilization',
      icon: Bus,
      value: '87%',
      subtitle: 'Lorem ipsum dolor',
    },
    {
      title: 'On-Time Performance',
      icon: Clock,
      value: '89%',
      subtitle: 'Lorem ipsum dolor',
    },
  ],
};

const Overview = () => {
  const [selectedDate, setSelectedDate] = useState<FilterDateType | undefined>(
    undefined
  );

  return (
    <>
      <h1 className="text-xl font-bold">{pageData.title}</h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        {pageData.description}
      </p>
      <FilterDate
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {pageData.overviewCards.map((card, index) => (
          <Cards key={index} card={card} />
        ))}
      </div>

      <hr />
      <div className="flex max-h-1/2 w-full flex-col gap-4 md:flex-row">
        <ReportCard
          header={{
            title: 'Revenue & Ridership Trends',
            description: 'Monthly performance over the last 6 months',
          }}
          link="/dashboard/financial"
          className="md:w-3/5"
        >
          <LineGraph />
        </ReportCard>
        <ReportCard
          header={{
            title: 'Ridership Trends',
            description: 'Today’s passenger flow',
          }}
          link="/dashboard/operations"
          className="md:w-2/5"
        >
          <BarGraph />
        </ReportCard>
      </div>
    </>
  );
};

export default Overview;
