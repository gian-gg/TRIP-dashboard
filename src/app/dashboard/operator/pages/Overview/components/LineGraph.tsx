import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  ridership: {
    label: 'Ridership',
    color: 'var(--chart-1)',
  },
  revenue: {
    label: 'Revenue',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const LineGraph = ({
  chartData,
}: {
  chartData: { x: string; ridership: string; revenue: string }[];
}) => {
  return (
    <ChartContainer className="w-full lg:max-h-[300px]" config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        className="w-2/5"
        margin={{ top: 0, right: 32, left: 32, bottom: 0 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="x"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
          tickFormatter={(value) => value}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillRidership" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="revenue"
          type="natural"
          fill="url(#fillRevenue)"
          fillOpacity={0.4}
          stroke="var(--chart-2)"
          stackId="a"
        />
        <Area
          dataKey="ridership"
          type="natural"
          fill="url(#fillRidership)"
          fillOpacity={0.4}
          stroke="var(--chart-1)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default LineGraph;
