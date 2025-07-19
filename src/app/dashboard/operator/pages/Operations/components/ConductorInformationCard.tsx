import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardAction } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { ConductorInformationType } from '../type';
import { User } from 'lucide-react';

function ConductorInformationCard(props: {
  ConductorInfo: ConductorInformationType;
  OnClick: (data: ConductorInformationType) => void;
}) {
  return (
    <div className="w-full">
      <Card className="bg-white border border-gray-200 flex h-full w-full flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-3 w-3 rounded-full border ${props.ConductorInfo.status === 'active' ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'}`}
              title={props.ConductorInfo.status.charAt(0).toUpperCase() + props.ConductorInfo.status.slice(1)}
            ></span>
            <CardTitle className="text-base font-bold md:text-base lg:text-xl">
              Conductor #{props.ConductorInfo.conductor_id}
            </CardTitle>
          </div>
          <CardAction>
            <User className="w-4 h-4" />
          </CardAction>
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
        <CardFooter>
          <Button onClick={() => props.OnClick(props.ConductorInfo)} className="w-full">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ConductorInformationCard;
