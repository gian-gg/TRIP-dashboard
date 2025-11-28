interface OverviewCardType {
  revenue: string;
  total_passengers: string;
  average_passenger_per_trip: string;
  total_trip: string;
  division: { x: string; ridership: string; revenue: string }[];
}

export const generateOverviewPrintReport = (
  overviewData: OverviewCardType | null
) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Overview Report</title>
        <style>
          @media print { @page { margin: 1cm; } }
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #186cc7; padding-bottom: 20px; }
          .header h1 { color: #186cc7; margin: 0 0 10px 0; font-size: 28px; }
          .header .date { color: #666; font-size: 14px; }
          .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
          .stat-card .label { font-size: 14px; color: #666; text-transform: uppercase; margin-bottom: 10px; }
          .stat-card .value { font-size: 32px; font-weight: bold; color: #186cc7; }
          .stat-card .subtitle { font-size: 12px; color: #999; margin-top: 5px; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Overview Report</h1>
          <div class="date">Generated on ${currentDate}</div>
        </div>
        <div class="stats">
          <div class="stat-card">
            <div class="label">Total Revenue</div>
            <div class="value">₱${(Number(overviewData?.revenue) || 0).toFixed(2)}</div>
            <div class="subtitle">July 24th, 2025</div>
          </div>
          <div class="stat-card">
            <div class="label">Total Passengers</div>
            <div class="value">${(Number(overviewData?.total_passengers) || 0).toFixed(2)}</div>
            <div class="subtitle">July 24th, 2025</div>
          </div>
          <div class="stat-card">
            <div class="label">Average Passengers per Trip</div>
            <div class="value">${(Number(overviewData?.average_passenger_per_trip) || 0).toFixed(2)}</div>
            <div class="subtitle">July 24th, 2025</div>
          </div>
          <div class="stat-card">
            <div class="label">Total Trips</div>
            <div class="value">${(Number(overviewData?.total_trip) || 0).toFixed(2)}</div>
            <div class="subtitle">July 24th, 2025</div>
          </div>
        </div>
        <div class="footer">
          <p>TRIP - Transit Routing and Integrated Payments</p>
        </div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
};
