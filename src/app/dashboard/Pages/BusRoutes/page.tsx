const BusRoutes = () => {
  return (
    <>
      <h1 className="text-xl font-bold">Bus Routes</h1>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted aspect-video rounded-xl" />
        <div className="bg-muted aspect-video rounded-xl" />
        <div className="bg-muted aspect-video rounded-xl" />
      </div>
      <div className="bg-muted min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </>
  );
};

export default BusRoutes;
