import type {
  BusInformationType,
  DriverInformationType,
  ConductorInformationType,
} from '../type';

export const generatePrintReport = (
  currentTab: 'bus' | 'driver' | 'conductor',
  filteredBusData: BusInformationType[],
  filteredDriverData: DriverInformationType[],
  filteredConductorData: ConductorInformationType[],
  stats: {
    totalBuses: number;
    activeBuses: number;
    maintenanceBuses: number;
    totalDrivers: number;
    activeDrivers: number;
    totalConductors: number;
    activeConductors: number;
  },
  companyId: string
) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  let tableContent = '';
  let title = '';

  if (currentTab === 'bus') {
    title = 'Bus Fleet Report';
    tableContent = `
      <table>
        <thead>
          <tr>
            <th>Bus ID</th>
            <th>Route</th>
            <th>Driver ID</th>
            <th>Conductor ID</th>
            <th>Status</th>
            <th>Next Maintenance</th>
          </tr>
        </thead>
        <tbody>
          ${filteredBusData
            .map(
              (bus) => `
            <tr>
              <td>${bus.bus_id}</td>
              <td>${bus.route_id || 'N/A'}</td>
              <td>${bus.driver_id || 'N/A'}</td>
              <td>${bus.conductor_id || 'N/A'}</td>
              <td>${bus.status}</td>
              <td>${bus.next_maintenance || 'N/A'}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  } else if (currentTab === 'driver') {
    title = 'Driver Fleet Report';
    tableContent = `
      <table>
        <thead>
          <tr>
            <th>Driver ID</th>
            <th>Full Name</th>
            <th>License Number</th>
            <th>Contact Number</th>
            <th>Bus ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredDriverData
            .map(
              (driver) => `
            <tr>
              <td>${driver.driver_id}</td>
              <td>${driver.full_name}</td>
              <td>${driver.license_number}</td>
              <td>${driver.contact_number}</td>
              <td>${driver.bus_id || 'N/A'}</td>
              <td>${driver.status}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  } else if (currentTab === 'conductor') {
    title = 'Conductor Fleet Report';
    tableContent = `
      <table>
        <thead>
          <tr>
            <th>Conductor ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Bus ID</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${filteredConductorData
            .map(
              (conductor) => `
            <tr>
              <td>${conductor.conductor_id}</td>
              <td>${conductor.name}</td>
              <td>${conductor.email}</td>
              <td>${conductor.contact_number}</td>
              <td>${conductor.bus_id || 'N/A'}</td>
              <td>${conductor.status}</td>
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          @media print {
            @page {
              margin: 1cm;
            }
          }
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #186cc7;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #186cc7;
            margin: 0 0 10px 0;
            font-size: 28px;
          }
          .header .date {
            color: #666;
            font-size: 14px;
          }
          .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 30px;
            padding: 15px;
            background: #f5f5f5;
            border-radius: 8px;
          }
          .stat-item {
            text-align: center;
          }
          .stat-item .label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
          }
          .stat-item .value {
            font-size: 24px;
            font-weight: bold;
            color: #186cc7;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          th {
            background-color: #186cc7;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
          }
          td {
            padding: 10px 12px;
            border-bottom: 1px solid #ddd;
            font-size: 13px;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          tr:hover {
            background-color: #f5f5f5;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <div class="date">Generated on ${currentDate}</div>
        </div>
        ${
          currentTab === 'bus'
            ? `
          <div class="stats">
            <div class="stat-item">
              <div class="label">Total Buses</div>
              <div class="value">${stats.totalBuses}</div>
            </div>
            <div class="stat-item">
              <div class="label">Active</div>
              <div class="value">${stats.activeBuses}</div>
            </div>
            <div class="stat-item">
              <div class="label">Maintenance Needed</div>
              <div class="value">${stats.maintenanceBuses}</div>
            </div>
          </div>
        `
            : currentTab === 'driver'
              ? `
          <div class="stats">
            <div class="stat-item">
              <div class="label">Total Drivers</div>
              <div class="value">${stats.totalDrivers}</div>
            </div>
            <div class="stat-item">
              <div class="label">Active</div>
              <div class="value">${stats.activeDrivers}</div>
            </div>
          </div>
        `
              : `
          <div class="stats">
            <div class="stat-item">
              <div class="label">Total Conductors</div>
              <div class="value">${stats.totalConductors}</div>
            </div>
            <div class="stat-item">
              <div class="label">Active</div>
              <div class="value">${stats.activeConductors}</div>
            </div>
          </div>
        `
        }
        ${tableContent}
        <div class="footer">
          <p>TRIP - Transit Routing and Integrated Payments</p>
          <p>Company: ${companyId}</p>
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
