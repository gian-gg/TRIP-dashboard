import Cards from '@/components/Cards';
import { Laugh, Frown, Wrench } from 'lucide-react';
import type { FleetStatistics } from '../utils/statistics';

interface StatisticsCardsProps {
  statistics: FleetStatistics;
}

export function StatisticsCards({ statistics }: StatisticsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Cards
        card={{
          title: 'Total Buses',
          icon: Laugh,
          value: statistics.totalBuses.toString(),
          subtitle: `${statistics.activeBuses} active, ${statistics.maintenanceBuses} need maintenance`,
        }}
      />
      <Cards
        card={{
          title: 'Total Drivers',
          icon: Frown,
          value: statistics.totalDrivers.toString(),
          subtitle: `${statistics.activeDrivers} active`,
        }}
      />
      <Cards
        card={{
          title: 'Total Conductors',
          icon: Wrench,
          value: statistics.totalConductors.toString(),
          subtitle: `${statistics.activeConductors} active`,
        }}
      />
    </div>
  );
}
