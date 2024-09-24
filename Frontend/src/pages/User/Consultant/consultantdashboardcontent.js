import React from 'react';
import { BarChart2, Users, Calendar, Clock } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white rounded-lg shadow p-5">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="text-lg font-semibold text-gray-900">{value}</dd>
        </dl>
      </div>
    </div>
  </div>
);

const ActivityItem = ({ title, time }) => (
  <li className="py-3">
    <div className="flex space-x-3">
      <Clock className="h-6 w-6 text-gray-400" />
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
    </div>
  </li>
);

const ConsultantDashboardContent = () => {
  const metrics = [
    { title: 'Total Clients', value: '42', icon: Users },
    { title: 'Active Projects', value: '12', icon: BarChart2 },
    { title: 'Upcoming Meetings', value: '8', icon: Calendar },
  ];

  const recentActivity = [
    { title: 'Client meeting with ABC Corp', time: '2 hours ago' },
    { title: 'Project proposal submitted', time: '5 hours ago' },
    { title: 'New resource added to knowledge base', time: '1 day ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[590px]">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {metrics.map((metric, index) => (
          <DashboardCard key={index} {...metric} />
        ))}
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConsultantDashboardContent;