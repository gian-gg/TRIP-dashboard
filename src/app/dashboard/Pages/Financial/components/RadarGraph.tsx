import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { type: 'Regular', count: 186 },
  { type: 'Senior', count: 305 },
  { type: 'PWD', count: 237 },
  { type: 'Student', count: 273 },
];

const chartConfig = {
  count: {
    label: 'Count',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

function RadarGraph() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px] w-full"
    >
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="type" />
        <PolarGrid />
        <Radar
          dataKey="count"
          fill="var(--color-count)"
          fillOpacity={0.6}
          dot={{
            r: 4,
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}

export default RadarGraph;
