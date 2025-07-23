import Cards from '@/components/Cards';
import ReportCard from '@/components/ReportCard';
import { Progress } from '@/components/ui/progress';
import PieGraph from './components/PieGraph';
import RadarGraph from './components/RadarGraph';

import FilterDate from '@/components/FilterDate';

import { TrendingUp, Fuel, DollarSign } from 'lucide-react';

const Financial = () => {
  return (
    <>
      <h1 className="text-xl font-bold">Financial</h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        This page provides an overview of the financial performance and key
        metrics.
      </p>
      <FilterDate />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Cards
          card={{
            title: 'Monthly Revenue',
            icon: TrendingUp,
            value: '$67,000',
            subtitle: 'Target: $70,000',
          }}
        >
          <Progress value={95} className="h-2 md:h-3" />
        </Cards>
        <Cards
          card={{
            title: 'Operating Costs',
            icon: Fuel,
            value: '$42,000',
            subtitle: '62.7% of revenue',
          }}
        >
          <ul>
            <li className="text-muted-foreground text-xs">
              <strong>Fuel</strong>: $15,000
            </li>
            <li className="text-muted-foreground text-xs">
              <strong>Maintenance</strong>: $10,000
            </li>
            <li className="text-muted-foreground text-xs">
              <strong>Salaries</strong>: $17,000
            </li>
          </ul>
        </Cards>
        <Cards
          card={{
            title: 'Net Profit',
            icon: DollarSign,
            value: '$25,000',
            subtitle: '37.3% margin',
          }}
        >
          <p className="text-sm text-green-600">+15% vs last month</p>
        </Cards>
      </div>
      <hr />
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
