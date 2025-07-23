import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  count: {
    label: 'Count',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

function RadarGraph(props: { data: { type: string; count: number }[] }) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px] w-full"
    >
      <RadarChart data={props.data}>
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
