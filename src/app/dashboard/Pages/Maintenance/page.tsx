const Maintenance = () => {
  return (
    <>
      <h1 className="text-xl font-bold">Maintenance</h1>
      <p className="text-muted-foreground text-xs md:text-sm">
        This page provides an overview of the maintenance activities and key
        metrics.
      </p>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted aspect-video rounded-xl" />
        <div className="bg-muted aspect-video rounded-xl" />
        <div className="bg-muted aspect-video rounded-xl" />
      </div>
      <div className="bg-muted min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </>
  );
};

export default Maintenance;
