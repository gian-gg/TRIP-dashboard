import { LabelList, Pie, PieChart } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A pie chart with a label list';

const chartData = [
  { method: 'online', count: 275, fill: 'var(--color-online)' },
  { method: 'cash', count: 200, fill: 'var(--color-cash)' },
];

const chartConfig = {
  count: {
    label: 'Count',
  },
  online: {
    label: 'Online',
    color: 'var(--chart-3)',
  },
  cash: {
    label: 'Cash',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

function PieGraph() {
  return (
    <ChartContainer
      config={chartConfig}
      className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px] w-full"
    >
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="count" hideLabel />}
        />
        <Pie data={chartData} dataKey="count">
          <LabelList
            dataKey="method"
            className="fill-black"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

export default PieGraph;
