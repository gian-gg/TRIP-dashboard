import ReportCard from '@/components/ReportCard';
import BarGraph from './components/BarGraph';
import Container from '@/components/ui/Container';
import FilterDate from '@/components/FilterDate';

const RouteData = [
  {
    route: 'Route 1',
    dailyPassengerCount: 120,
    dailyRevenue: 500,
    revenuePerPassenger: 4.17,
  },
  {
    route: 'Route 2',
    dailyPassengerCount: 80,
    dailyRevenue: 300,
    revenuePerPassenger: 3.75,
  },
  {
    route: 'Route 3',
    dailyPassengerCount: 150,
    dailyRevenue: 600,
    revenuePerPassenger: 4.0,
  },
  {
    route: 'Route 4',
    dailyPassengerCount: 90,
    dailyRevenue: 400,
    revenuePerPassenger: 4.44,
  },
  {
    route: 'Route 5',
    dailyPassengerCount: 200,
    dailyRevenue: 800,
    revenuePerPassenger: 4.0,
  },
];

const BusRoutes = () => {
  return (
    <>
      <h1 className="text-xl font-bold">Bus Routes</h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        This page provides an overview of the bus routes and their key metrics.
      </p>
      <FilterDate />

      <ReportCard
        header={{
          title: 'Route Performance',
          description: 'Passenger counts for each bus route',
        }}
        className="max-h-96 w-full"
      >
        <BarGraph />
      </ReportCard>
      <hr />
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {RouteData.map((route, index) => (
          <Container key={index} className="p-4">
            <h2 className="mb-2 text-lg font-bold">{route.route}</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="pr-2">Daily Passenger Count:</td>
                  <td className="font-semibold">{route.dailyPassengerCount}</td>
                </tr>
                <tr>
                  <td className="pr-2">Daily Revenue:</td>
                  <td className="font-semibold">₱{route.dailyRevenue}</td>
                </tr>
                <tr>
                  <td className="pr-2">Revenue per Passenger:</td>
                  <td className="font-semibold">
                    ₱{route.revenuePerPassenger.toFixed(2)}
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
