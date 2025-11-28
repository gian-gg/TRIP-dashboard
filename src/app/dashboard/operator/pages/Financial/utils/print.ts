interface FinancialDataType {
  gross_revenue: string;
  total_passengers: string;
  payment_mode_breakdown: {
    method: 'cash' | 'online';
    percentage: number;
    count: number;
    revenue: number;
  }[];
  passenger_category_breakdown: {
    type: 'regular' | 'student' | 'senior' | 'pwd';
    percentage: number;
    count: number;
    revenue: number;
  }[];
}

export const generateFinancialPrintReport = (
  data: FinancialDataType | null
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
        <title>Financial Report</title>
        <style>
          @media print { @page { margin: 1cm; } }
          body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #186cc7; padding-bottom: 20px; }
          .header h1 { color: #186cc7; margin: 0 0 10px 0; font-size: 28px; }
          .header .date { color: #666; font-size: 14px; }
          .revenue-section { background: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; padding: 30px; margin-bottom: 30px; text-align: center; }
          .revenue-section .label { font-size: 18px; color: #666; margin-bottom: 10px; }
          .revenue-section .value { font-size: 48px; font-weight: bold; color: #186cc7; margin: 10px 0; }
          .stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
          .stat-card .label { font-size: 12px; color: #666; text-transform: uppercase; margin-bottom: 10px; }
          .stat-card .value { font-size: 24px; font-weight: bold; color: #186cc7; }
          .breakdown-section { margin-top: 30px; }
          .breakdown-section h2 { font-size: 20px; color: #186cc7; margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; }
          th { background-color: #186cc7; color: white; padding: 12px; text-align: left; }
          td { padding: 10px 12px; border-bottom: 1px solid #ddd; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Financial Report</h1>
          <div class="date">Generated on ${currentDate}</div>
        </div>
        <div class="revenue-section">
          <div class="label">Monthly Revenue</div>
          <div class="value">₱${data?.gross_revenue || '0.00'}</div>
          <div style="font-size: 14px; color: #666;">Total income generated</div>
        </div>
        <div class="stats">
          <div class="stat-card">
            <div class="label">Regular Passengers</div>
            <div class="value">₱${(Number(data?.passenger_category_breakdown[0]?.revenue) || 0).toFixed(2)}</div>
          </div>
          <div class="stat-card">
            <div class="label">Senior Passengers</div>
            <div class="value">₱${(Number(data?.passenger_category_breakdown[1]?.revenue) || 0).toFixed(2)}</div>
          </div>
          <div class="stat-card">
            <div class="label">PWD Passengers</div>
            <div class="value">₱${(Number(data?.passenger_category_breakdown[2]?.revenue) || 0).toFixed(2)}</div>
          </div>
          <div class="stat-card">
            <div class="label">Student Passengers</div>
            <div class="value">₱${(Number(data?.passenger_category_breakdown[3]?.revenue) || 0).toFixed(2)}</div>
          </div>
        </div>
        <div class="breakdown-section">
          <h2>Payment Method Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Method</th>
                <th>Count</th>
                <th>Revenue</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${data?.payment_mode_breakdown
                .map(
                  (method) => `
                <tr>
                  <td style="text-transform: capitalize;">${method.method}</td>
                  <td>${method.count}</td>
                  <td>₱${method.revenue.toFixed(2)}</td>
                  <td>${method.percentage.toFixed(1)}%</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
        <div class="breakdown-section">
          <h2>Passenger Category Breakdown</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Revenue</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${data?.passenger_category_breakdown
                .map(
                  (category) => `
                <tr>
                  <td style="text-transform: capitalize;">${category.type}</td>
                  <td>${category.count}</td>
                  <td>₱${category.revenue.toFixed(2)}</td>
                  <td>${category.percentage.toFixed(1)}%</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
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
