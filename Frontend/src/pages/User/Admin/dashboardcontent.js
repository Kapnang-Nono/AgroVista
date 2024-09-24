import React from 'react';

const AdminDashboardContent = () => {
  // Mock data for the charts and metrics
  const monthlyData = [
    { month: 'Jan', users: 4000, revenue: 95000, consultations: 3200 },
    { month: 'Feb', users: 4200, revenue: 98000, consultations: 3300 },
    { month: 'Mar', users: 4500, revenue: 102000, consultations: 3500 },
    { month: 'Apr', users: 4800, revenue: 107000, consultations: 3700 },
    { month: 'May', users: 5100, revenue: 113000, consultations: 3900 },
    { month: 'Jun', users: 5400, revenue: 120000, consultations: 4100 },
  ];

  const maxUsers = Math.max(...monthlyData.map(d => d.users));
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  const userTypes = [
    { type: 'Customers', count: 3800 },
    { type: 'Consultants', count: 950 },
    { type: 'Drivers', count: 650 },
  ];

  return (
    <div className="p-6 rounded-lg ">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Agribusiness Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Active Users" value="1,400" trend="up" percentage="12%" />
        <MetricCard title="Monthly Revenue" value="1,200,000" trend="up" percentage="8%" />
        <MetricCard title="Consultations" value="400" trend="up" percentage="5%" />
        <MetricCard title="Deliveries" value="700" trend="up" percentage="3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">User Growth</h3>
          <div className="h-64">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              {monthlyData.map((data, index) => (
                <g key={data.month}>
                  <rect
                    x={index * 50}
                    y={200 - (data.users / maxUsers) * 180}
                    width="40"
                    height={(data.users / maxUsers) * 180}
                    fill="#4F46E5"
                    className="transition-all duration-300 ease-in-out hover:fill-indigo-400"
                  />
                  <text
                    x={index * 50 + 20}
                    y="195"
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {data.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Revenue Trend</h3>
          <div className="h-64">
            <svg className="w-full h-full" viewBox="0 0 300 200">
              <polyline
                points={monthlyData.map((data, index) => 
                  `${index * 50},${200 - (data.revenue / maxRevenue) * 180}`
                ).join(' ')}
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
              />
              {monthlyData.map((data, index) => (
                <g key={data.month}>
                  <circle
                    cx={index * 50}
                    cy={200 - (data.revenue / maxRevenue) * 180}
                    r="4"
                    fill="#10B981"
                  />
                  <text
                    x={index * 50}
                    y="195"
                    textAnchor="middle"
                    className="text-xs fill-gray-600"
                  >
                    {data.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">User Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {userTypes.map((data, index) => {
                const total = userTypes.reduce((sum, type) => sum + type.count, 0);
                const startAngle = index === 0 ? 0 : userTypes.slice(0, index).reduce((sum, type) => sum + type.count, 0) / total * 2 * Math.PI;
                const endAngle = (userTypes.slice(0, index + 1).reduce((sum, type) => sum + type.count, 0) / total) * 2 * Math.PI;
                const x1 = 100 + 80 * Math.cos(startAngle);
                const y1 = 100 + 80 * Math.sin(startAngle);
                const x2 = 100 + 80 * Math.cos(endAngle);
                const y2 = 100 + 80 * Math.sin(endAngle);
                const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
                const colors = ['#3B82F6', '#10B981', '#F59E0B'];

                return (
                  <g key={data.type}>
                    <path
                      d={`M100,100 L${x1},${y1} A80,80 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                      fill={colors[index]}
                      className="transition-all duration-300 ease-in-out hover:opacity-80"
                    />
                    <text
                      x={100 + 60 * Math.cos((startAngle + endAngle) / 2)}
                      y={100 + 60 * Math.sin((startAngle + endAngle) / 2)}
                      textAnchor="middle"
                      fill="white"
                      className="text-xs"
                    >
                      {data.type}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <ActivityItem 
              title="New Consultant Registered" 
              description="John Doe joined as an agricultural consultant" 
              time="2 hours ago"
            />
            <ActivityItem 
              title="Large Order Placed" 
              description="Farm Co. ordered 5000kg of fertilizer" 
              time="5 hours ago"
            />
            <ActivityItem 
              title="Successful Delivery" 
              description="Order #1234 delivered to Green Acres Farm" 
              time="1 day ago"
            />
            <ActivityItem 
              title="New Feature Launched" 
              description="Crop prediction tool now available for all users" 
              time="2 days ago"
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, trend, percentage }) => {
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const trendIcon = trend === 'up' ? '↑' : '↓';

  return (
    <div className="bg-white p-6 rounded-lg shadow transition-all duration-300 ease-in-out hover:shadow-xl">
      <h3 className="text-lg font-semibold text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm font-medium ${trendColor}`}>
          {trendIcon} {percentage}
        </p>
      </div>
    </div>
  );
};

const ActivityItem = ({ title, description, time }) => {
  return (
    <li className="flex items-center space-x-3">
      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full"></div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </li>
  );
};

export default AdminDashboardContent;