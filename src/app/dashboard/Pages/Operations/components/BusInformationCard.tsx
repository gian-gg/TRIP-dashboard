import React from 'react';
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

function BusInformationCard(props: {
  BusInfo: BusInformationType;
  OnClick: (data: BusInformationType) => void;
}) {
  const status = props.BusInfo['status'];
  let StatusClass = 'text-black';
  switch (status) {
    case 'active':
      StatusClass =
        'pl-2 pr-2 pt-1 pb-1 rounded-full text-green-600 font-bold bg-green-100 border-green-300';
      break;
    case 'inactive':
      StatusClass =
        'pl-2 pr-2 pt-1 pb-1 rounded-full text-red-600 font-bold bg-red-100 border-red-300';
      break;
    case 'in transit':
      StatusClass =
        'pl-2 pr-2 pt-1 pb-1 rounded-full text-yellow-500 font-bold bg-yellow-100 border-yellow-300';
      break;
    default:
      StatusClass = 'text-black';
  }
  return (
    <div className="w-full">
      <Card className="border-outline flex h-full w-full flex-col border-1">
        <CardHeader>
          <CardTitle className="text-base font-bold md:text-base lg:text-xl">
            Bus #{props.BusInfo['bus_id']}
          </CardTitle>
          <CardAction className={`${StatusClass}, text-sm`}>
            {props.BusInfo['status']}
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
