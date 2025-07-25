import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from '../type';
import { Badge } from '@/components/ui/badge';

function BusInformationCard(props: {
  BusInfo: BusInformationType;
  DriverInfo?: DriverInformationType;
  ConductorInfo?: ConductorInformationType;
  OnClick: (data: BusInformationType) => void;
}) {
  // Calculate days left until next maintenance
  function getDaysLeft(dateString: string) {
    const today = new Date(); // always gets the current date at call time
    const target = new Date(dateString);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    const diff = Math.ceil(
      (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }

  const daysLeft = getDaysLeft(props.BusInfo.next_maintenance);
  let maintenanceBadgeColor = 'bg-black text-white';
  if (daysLeft <= 14 && daysLeft > 7) {
    maintenanceBadgeColor = 'bg-white text-black border border-black';
  } else if (daysLeft <= 7 && daysLeft > 3) {
    maintenanceBadgeColor = 'bg-red-100 text-red-700 border-red-300';
  } else if (daysLeft <= 3) {
    maintenanceBadgeColor = 'bg-destructive text-white';
  }

  return (
    <div className="w-full">
      <Card className="flex h-full w-full flex-col border border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-base font-bold md:text-base lg:text-xl">
            <div>
              <span
                className={`inline-block h-3 w-3 rounded-full border ${
                  props.BusInfo.status === 'active'
                    ? 'border-green-600 bg-green-500'
                    : props.BusInfo.status === 'inactive'
                      ? 'border-red-600 bg-red-500'
                      : props.BusInfo.status === 'in maintenance'
                        ? 'border-gray-500 bg-gray-400'
                        : props.BusInfo.status === 'in transit'
                          ? 'border-yellow-500 bg-yellow-400'
                          : ''
                }`}
                title={
                  props.BusInfo.status.charAt(0).toUpperCase() +
                  props.BusInfo.status.slice(1)
                }
              ></span>
            </div>
            {props.BusInfo['bus_id']}
          </CardTitle>
          {props.BusInfo.next_maintenance && (
            <CardAction className="text-sm">
              <Badge variant="default" className={maintenanceBadgeColor}>
                {daysLeft > 0
                  ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`
                  : 'Maintenance due!'}
              </Badge>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="grid h-full w-full grid-cols-2 grid-rows-2 gap-5 p-3 sm:p-5">
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Route:
            </p>
            <p className="text-xs md:text-sm">
              {props.BusInfo['route_id'] ?? 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Bus Driver:
            </p>
            <p className="text-xs md:text-sm">
              {props.DriverInfo?.['full_name'] ?? 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Conductor:
            </p>
            <p className="text-xs md:text-sm">
              {props.ConductorInfo?.['name'] ?? 'N/A'}
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
