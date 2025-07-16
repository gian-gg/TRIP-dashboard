import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', ridership: 180, reviews: 40 },
  { month: 'February', ridership: 220, reviews: 85 },
  { month: 'March', ridership: 310, reviews: 130 },
  { month: 'April', ridership: 270, reviews: 160 },
  { month: 'May', ridership: 350, reviews: 200 },
  { month: 'June', ridership: 290, reviews: 180 },
];

const chartConfig = {
  ridership: {
    label: 'Ridership',
    color: 'var(--chart-1)',
  },
  reviews: {
    label: 'Reviews',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

const LineGraph = () => {
  return (
    <ChartContainer className="w-full lg:max-h-[300px]" config={chartConfig}>
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <defs>
          <linearGradient id="fillRidership" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="fillReviews" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="reviews"
          type="natural"
          fill="url(#fillReviews)"
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
