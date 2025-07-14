import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { time: '12 AM', riders: 45, fill: 'var(--chart-1)' },
  { time: '4 AM', riders: 65, fill: 'var(--chart-2)' },
  { time: '8 AM', riders: 180, fill: 'var(--chart-3)' },
  { time: '12 PM', riders: 210, fill: 'var(--chart-4)' },
  { time: '4 PM', riders: 160, fill: 'var(--chart-5)' },
  { time: '8 PM', riders: 120, fill: 'var(--chart-6)' },
];

const chartConfig = {
  riders: {
    label: 'Riders',
  },
  '12 AM': {
    label: '12 AM',
    color: 'var(--chart-1)',
  },
  '4 AM': {
    label: '4 AM',
    color: 'var(--chart-2)',
  },
  '8 AM': {
    label: '8 AM',
    color: 'var(--chart-3)',
  },
  '12 PM': {
    label: '12 PM',
    color: 'var(--chart-4)',
  },
  '4 PM': {
    label: '4 PM',
    color: 'var(--chart-5)',
  },
  '8 PM': {
    label: '8 PM',
    color: 'var(--chart-6)',
  },
} satisfies ChartConfig;

export function BarGraph() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
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
          dataKey="riders"
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
