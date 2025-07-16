import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { BusInformationType } from '../type';
import { Circle } from 'lucide-react';
import { Badge } from './Badge';

function BusInformationCard(props: {
  BusInfo: BusInformationType;
  OnClick: (data: BusInformationType) => void;
}) {
  const status = props.BusInfo['status'];
  let StatusColorClass = 'text-black';
  switch (status) {
    case 'active':
      StatusColorClass = 'text-green-600';
      break;
    case 'inactive':
      StatusColorClass = 'text-red-600';
      break;
    case 'in transit':
      StatusColorClass = 'text-yellow-500';
      break;
    default:
      StatusColorClass = 'text-black';
  }

  // Calculate days left until next maintenance
  function getDaysLeft(dateString: string) {
    const today = new Date(); // always gets the current date at call time
    const target = new Date(dateString);
    today.setHours(0,0,0,0);
    target.setHours(0,0,0,0);
    const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  }

  const daysLeft = getDaysLeft(props.BusInfo.next_maintenance);
  let maintenanceBadgeColor = 'bg-black text-white';
  if (daysLeft <= 14 && daysLeft > 7) {
    maintenanceBadgeColor = 'bg-white text-black border border-black';
  } else if (daysLeft <= 7 && daysLeft > 3) {
    maintenanceBadgeColor = 'bg-red-100 text-red-700 border-red-300';
  } else if (daysLeft <= 3) {
    maintenanceBadgeColor = 'bg-red-600 text-white border border-red-800';
  }

  return (
    <div className="w-full">
      <Card className="bg-white border border-gray-200 flex h-full w-full flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-base font-bold md:text-base lg:text-xl">
            <div>
              <Circle className={`h-4 w-4 ${StatusColorClass}`} fill="currentColor" />
            </div>
            Bus #{props.BusInfo['bus_id']}
          </CardTitle>
          <CardAction className="text-sm">
            <Badge variant="default" className={maintenanceBadgeColor}>
              {daysLeft > 0 ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left` : 'Maintenance due!'}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="grid h-full w-full grid-cols-2 grid-rows-2 gap-5 p-3 sm:p-5">
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Route:
            </p>
            <p className="text-xs md:text-sm">{props.BusInfo['route_id']}</p>
          </div>
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Bus Driver:
            </p>
            <p className="text-xs md:text-sm">{props.BusInfo['driver_id']}</p>
          </div>
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Current Location:
            </p>
            <p className="text-xs md:text-sm">
              {props.BusInfo['curr_location']}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Passenger Count:
            </p>
            <p className="text-xs md:text-sm">
              {props.BusInfo['passenger_count']}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => props.OnClick(props.BusInfo)}
            className="w-full"
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BusInformationCard;
