import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

import type { FilterDateType } from '@/type';

const FilterDate = (props: {
  selectedDate: FilterDateType | undefined;
  setSelectedDate: (date: FilterDateType | undefined) => void;
}) => {
  const { selectedDate, setSelectedDate } = props;

  const [filterType, setFilterType] = useState<
    'day' | 'week' | 'month' | 'all'
  >('week');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);

  const getDayRange = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  };

  // Get the week range (Sunday to Saturday)
  const getWeekRange = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 }); // 0 = Sunday
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return { start, end };
  };

  // Get month range
  const getMonthRange = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return { start, end };
  };

  // Format display text based on selection
  const getDisplayText = () => {
    if (!date) return 'Select date';

    switch (filterType) {
      case 'day':
        return format(date, 'PPP'); // e.g. "July 23rd, 2023"
      case 'week': {
        const { start, end } = getWeekRange(date);
        return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
      }
      case 'month':
        return format(date, 'MMMM yyyy');
      case 'all':
        return 'All Time';
    }
  };

  useEffect(() => {
    switch (filterType) {
      case 'day': {
        const dayRange = getDayRange(date!);
        setSelectedDate(dayRange);
        break;
      }
      case 'week': {
        const weekRange = getWeekRange(date!);
        setSelectedDate(weekRange);
        break;
      }
      case 'month': {
        const monthRange = getMonthRange(date!);
        setSelectedDate(monthRange);
        break;
      }
      case 'all':
        setSelectedDate(undefined);
        break;
    }
  }, [date, filterType, setSelectedDate]);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  return (
    <div className="flex items-center gap-2">
      <Select
        value={filterType}
        onValueChange={(value) =>
          setFilterType(value as 'day' | 'week' | 'month' | 'all')
        }
      >
        <SelectTrigger className="w-fit">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Any Day</SelectItem>
          <SelectItem value="week">Any Week (Sun-Sat)</SelectItem>
          <SelectItem value="month">Any Month</SelectItem>
          <SelectItem value="all">All Time</SelectItem>
        </SelectContent>
      </Select>

      {filterType !== 'all' && (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className="w-fit justify-start text-left font-normal"
            >
              {getDisplayText()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                setDate(selectedDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default FilterDate;
