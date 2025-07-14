import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { route: 'Route 1', passengers: 45, fill: 'var(--chart-1)' },
  { route: 'Route 2', passengers: 65, fill: 'var(--chart-2)' },
  { route: 'Route 3', passengers: 180, fill: 'var(--chart-3)' },
  { route: 'Route 4', passengers: 210, fill: 'var(--chart-4)' },
  { route: 'Route 5', passengers: 160, fill: 'var(--chart-5)' },
];

const chartConfig = {
  passengers: {
    label: 'Passengers',
  },
  'Route 1': {
    label: 'Route 1',
  },
  'Route 2': {
    label: 'Route 2',
  },
  'Route 3': {
    label: 'Route 3',
  },
  'Route 4': {
    label: 'Route 4',
  },
  'Route 5': {
    label: 'Route 5',
  },
} satisfies ChartConfig;

export function BarGraph() {
  return (
    <ChartContainer config={chartConfig} className="h-70 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="route"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            chartConfig[value as keyof typeof chartConfig]?.label
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar
          dataKey="passengers"
          strokeWidth={2}
          radius={8}
          activeIndex={2}
          activeBar={({ ...props }) => {
            return (
              <Rectangle
                {...props}
                fillOpacity={0.8}
                stroke={props.payload.fill}
                strokeDasharray={4}
                strokeDashoffset={4}
              />
            );
          }}
        />
      </BarChart>
    </ChartContainer>
  );
}

export default BarGraph;
