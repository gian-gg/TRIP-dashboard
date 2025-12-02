import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatTimeTo12Hour } from '@/lib/misc';
import { Pencil, Trash } from 'lucide-react';
import type {
  BusInformationType,
  ConductorInformationType,
  DriverInformationType,
} from '../type';

const busModal = ({
  isModalOpen,
  setIsModalOpen,
  setIsEditModalOpen,
  selectedBus,
  currentDriverData,
  currentConductorData,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  selectedBus: BusInformationType | null;
  currentDriverData: DriverInformationType[];
  currentConductorData: ConductorInformationType[];
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="!w-full !max-w-4xl">
        <DialogHeader>
          <DialogTitle>Bus Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Here are the details of the selected bus.
        </DialogDescription>

        {selectedBus ? (
          <div className="flex w-full flex-col items-start justify-between gap-10 md:flex-row">
            {/* Bus details table */}
            <table className="border-outline w-full rounded-md border-2 md:w-1/2">
              <thead>
                <tr>
                  <th
                    colSpan={2}
                    className="bg-neutral border-outline border-2 p-2 text-left sm:text-lg md:p-4 md:text-xl"
                  >
                    Current Bus Information
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Bus ID
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.bus_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Route
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.route_id}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Driver
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.driver_id ? selectedBus.driver_id + ' - ' : ''}
                    {currentDriverData.find(
                      (driver) => driver.driver_id === selectedBus.driver_id
                    )?.full_name ?? 'N/A'}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Conductor
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.conductor_id} -{' '}
                    {currentConductorData.find(
                      (conductor) =>
                        conductor.conductor_id === selectedBus.conductor_id
                    )?.name ?? 'N/A'}
                  </td>
                </tr>
                <tr className="border-outline border-b-2">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Status
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm capitalize md:text-lg">
                    <span
                      className={
                        selectedBus.status === 'active'
                          ? 'font-semibold text-green-400'
                          : selectedBus.status === 'inactive'
                            ? 'text-destructive font-semibold'
                            : ''
                      }
                    >
                      {selectedBus.status.charAt(0).toUpperCase() +
                        selectedBus.status.slice(1)}
                    </span>
                  </td>
                </tr>
                <tr className="border-outline">
                  <td className="text-secondary-foreground p-2 text-sm font-semibold md:text-lg">
                    Next Maintenance
                  </td>
                  <td className="text-muted-foreground p-2 text-end text-sm md:text-lg">
                    {selectedBus.next_maintenance}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Timeline Chart */}
            <div className="w-full md:w-1/2">
              <div className="mb-4 flex w-full items-center justify-between">
                <h3 className="text-lg font-semibold">Bus Timeline</h3>
                {selectedBus.trips.length > 0 && (
                  <span className="text-muted-foreground mb-2 text-sm">
                    Trips Today:{' '}
                    {
                      selectedBus.trips.filter((trip) => {
                        const tripDate = new Date(trip.boarding_time);
                        const today = new Date();
                        return (
                          tripDate.getDate() === today.getDate() &&
                          tripDate.getMonth() === today.getMonth() &&
                          tripDate.getFullYear() === today.getFullYear()
                        );
                      }).length
                    }
                  </span>
                )}
              </div>
              {selectedBus.trips.length > 0 ? (
                <div className="relative max-h-72 overflow-y-auto">
                  <ul className="relative pl-2">
                    {/* Vertical line */}
                    <div className="absolute top-2 bottom-2 left-[22px] z-0 w-px bg-gray-300" />
                    {selectedBus.trips.map((event, idx) => (
                      <li
                        key={idx}
                        className="relative z-10 mb-4 ml-4 flex flex-col"
                      >
                        <div className="border-primary absolute top-2 left-[-12px] z-20 h-5 w-5 rounded-full border-2 bg-white" />
                        <time className="mb-1 ml-8 text-xs font-normal text-gray-400">
                          <strong>{event.boarding_time.split(' ')[0]}</strong> |{' '}
                          {formatTimeTo12Hour(event.boarding_time)} -{' '}
                          {formatTimeTo12Hour(event.arrival_time)}
                        </time>
                        <h4 className="text-md ml-8 font-semibold text-gray-900">
                          Trip ID: {event.trip_id}
                        </h4>
                        <p className="mb-2 ml-8 text-sm font-normal text-gray-500">
                          Conductor ID: {event.conductor_id} | Driver ID:{' '}
                          {event.driver_id} | Route ID: {event.route_id}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-muted-foreground w-full text-center md:w-1/2">
                  No timeline data available.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground text-center text-sm md:text-lg">
            No bus selected.
          </div>
        )}
        <DialogFooter>
          <div className="flex w-full justify-end gap-2">
            <Button
              className="bg-destructive w-1/2 text-white hover:bg-red-700 md:w-fit"
              onClick={() => {
                if (selectedBus) {
                  setIsModalOpen(false);
                  //   handleDeleteBus(selectedBus.bus_id, props.refreshData);
                }
              }}
            >
              <Trash />
              Delete Bus
            </Button>
            <Button
              className="w-1/2 md:w-fit"
              onClick={() => {
                if (selectedBus) {
                  setIsEditModalOpen(true);
                  setIsModalOpen(false);
                }
              }}
            >
              <Pencil />
              Edit Bus
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default busModal;
