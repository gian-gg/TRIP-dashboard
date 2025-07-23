import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const FilterDate = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex w-fit items-center justify-between"
        >
          <span className="text-sm font-medium">Weekly</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onSelect={() => console.log('weekly')}>
          Weekly
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('monthly')}>
          Monthly
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => console.log('all-time')}>
          All Time
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDate;
