import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

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

export function BarGraph(props: {
  data: { route: string; passengers: number; fill: string }[];
}) {
  return (
    <ChartContainer config={chartConfig} className="h-70 w-full">
      <BarChart accessibilityLayer data={props.data}>
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
