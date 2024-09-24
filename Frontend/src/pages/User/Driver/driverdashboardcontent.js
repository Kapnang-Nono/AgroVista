import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Truck, MapPin, Clock, DollarSign, TrendingUp, Battery, AlertTriangle } from 'lucide-react';

const performanceData = [
  { name: 'Mon', deliveries: 12, efficiency: 85 },
  { name: 'Tue', deliveries: 19, efficiency: 90 },
  { name: 'Wed', deliveries: 15, efficiency: 88 },
  { name: 'Thu', deliveries: 17, efficiency: 92 },
  { name: 'Fri', deliveries: 20, efficiency: 95 },
  { name: 'Sat', deliveries: 10, efficiency: 82 },
  { name: 'Sun', deliveries: 5, efficiency: 78 },
];

const fuelConsumptionData = [
  { name: 'Week 1', consumption: 120 },
  { name: 'Week 2', consumption: 132 },
  { name: 'Week 3', consumption: 125 },
  { name: 'Week 4', consumption: 118 },
];

const MetricCard = ({ icon, title, value, subvalue, color }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 flex items-center ${color}`}>
    <div className="mr-4">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      {subvalue && <p className="text-sm text-gray-500">{subvalue}</p>}
    </div>
  </div>
);

const DriverDashboardContent = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-8">Driver Dashboard</h1>
    
    {/* Current Assignment */}
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Current Assignment</h2>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-4">
          <p className="flex items-center mb-2">
            <MapPin className="mr-2" /> Route: Warehouse A to Farm B
          </p>
          <p className="flex items-center mb-2">
            <Clock className="mr-2" /> ETA: 2 hours 30 minutes
          </p>
          <p className="flex items-center">
            <Truck className="mr-2" /> Distance: 120 km
          </p>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p>John Doe </p>
            <p>Phone: +237 674 066 938 </p>
          </div>
        </div>
      </div>
    </div>
    
    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <MetricCard icon={<Truck className="text-blue-500" size={24} />} title="Total Deliveries" value="89" subvalue="This Week" color="border-l-4 border-blue-500" />
      <MetricCard icon={<TrendingUp className="text-green-500" size={24} />} title="Efficiency Rate" value="92%" subvalue="3% increase" color="border-l-4 border-green-500" />
      <MetricCard icon={<DollarSign className="text-yellow-500" size={24} />} title="Earnings" value="$1,240" subvalue="This Week" color="border-l-4 border-yellow-500" />

    </div>
    
    {/* Performance Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="deliveries" fill="#3B82F6" name="Deliveries" />
            <Bar yAxisId="right" dataKey="efficiency" fill="#10B981" name="Efficiency %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Fuel Consumption Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fuelConsumptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="consumption" stroke="#EF4444" name="Fuel Consumption (L)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default DriverDashboardContent;