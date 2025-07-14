import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ConductorInformationType } from '../type';

function ConductorInformationCard(props: {
  ConductorInfo: ConductorInformationType;
  OnClick: (data: ConductorInformationType) => void;
}) {
  return (
    <div className="w-full">
      <Card className="border-outline flex h-full w-full flex-col border-1">
        <CardHeader>
          <CardTitle className="text-base font-bold md:text-base lg:text-xl">
            Conductor #{props.ConductorInfo.conductor_id}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid h-full w-full grid-cols-2 grid-rows-2 gap-5 p-3 sm:p-5">
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Name:
            </p>
            <p className="text-xs md:text-sm">
              {props.ConductorInfo.full_name}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Contact:
            </p>
            <p className="text-xs md:text-sm">
              {props.ConductorInfo.contact_number}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold md:text-sm lg:text-base">
              Bus ID:
            </p>
            <p className="text-xs md:text-sm">
              {props.ConductorInfo.bus_id ?? 'N/A'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConductorInformationCard;
