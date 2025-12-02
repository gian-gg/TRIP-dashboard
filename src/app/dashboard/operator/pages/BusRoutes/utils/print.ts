interface RouteDataType {
  route_id: string;
  route_name: string;
  passengers: string;
  daily_revenue: string;
  revenue_per_passenger: string;
}

export const generateBusRoutesPrintReport = (
  data: RouteDataType[] | null,
  chartImage?: string
) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const totalDailyPassengers =
    data?.reduce((sum, route) => sum + Number(route.passengers), 0) || 0;
  const totalRevenue =
    data?.reduce((sum, route) => sum + Number(route.daily_revenue), 0) || 0;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Bus Routes Report</title>
        <style>
          @media print { @page { margin: 1cm; } }
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #186cc7; padding-bottom: 20px; }
          .header h1 { color: #186cc7; margin: 0 0 10px 0; font-size: 28px; }
          .header .date { color: #666; font-size: 14px; }
          .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
          .summary-card { background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 20px; text-align: center; }
          .summary-card .label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 10px; }
          .summary-card .value { font-size: 32px; font-weight: bold; color: #186cc7; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #186cc7; color: white; padding: 12px; text-align: left; }
          td { padding: 10px 12px; border-bottom: 1px solid #ddd; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Bus Routes Performance Report</h1>
          <div class="date">Generated on ${currentDate}</div>
        </div>
        <div class="summary">
          <div class="summary-card">
            <div class="label">Total Routes</div>
            <div class="value">${data?.length || 0}</div>
          </div>
          <div class="summary-card">
            <div class="label">Total Daily Passengers</div>
            <div class="value">${totalDailyPassengers.toLocaleString()}</div>
          </div>
          <div class="summary-card">
            <div class="label">Total Daily Revenue</div>
            <div class="value">₱${totalRevenue.toFixed(2)}</div>
          </div>
        </div>
        ${
          chartImage
            ? `
          <div style="margin-top:20px;text-align:center;">
            <h3 style="color:#186cc7;margin-bottom:10px;">Route Performance Chart</h3>
            <img src="${chartImage}" alt="Route Performance Chart" style="max-width:100%;height:auto;border:1px solid #e5e7eb;padding:8px;border-radius:6px;background:#fff;"/>
          </div>
        `
            : ''
        }
        <table>
          <thead>
            <tr>
              <th>Route ID</th>
              <th>Route Name</th>
              <th>Daily Passengers</th>
              <th>Daily Revenue</th>
              <th>Revenue per Passenger</th>
            </tr>
          </thead>
          <tbody>
            ${
              data
                ?.map(
                  (route) => `
              <tr>
                <td><strong>${route.route_id}</strong></td>
                <td>${route.route_name}</td>
                <td>${Number(route.passengers).toLocaleString()}</td>
                <td>₱${Number(route.daily_revenue).toFixed(2)}</td>
                <td>₱${Number(route.revenue_per_passenger).toFixed(2)}</td>
              </tr>
            `
                )
                .join('') || ''
            }
          </tbody>
        </table>
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
