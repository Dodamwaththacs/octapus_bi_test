'use client';
import { useState, useEffect } from 'react';
import { FaUsers, FaShoppingCart, FaPizzaSlice, FaDollarSign } from 'react-icons/fa';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 156,
    totalRevenue: 4892.50,
    activeUsers: 83,
    popularItems: [
      { name: 'Pepperoni Pizza', orders: 45 },
      { name: 'Margherita Pizza', orders: 38 },
      { name: 'Supreme Pizza', orders: 32 },
    ]
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <FaShoppingCart className="text-3xl text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <FaDollarSign className="text-3xl text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
            </div>
            <FaUsers className="text-3xl text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Popular Items</p>
              <p className="text-2xl font-bold">{stats.popularItems.length}</p>
            </div>
            <FaPizzaSlice className="text-3xl text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Popular Items</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item Name</th>
                <th className="text-right py-2">Orders</th>
              </tr>
            </thead>
            <tbody>
              {stats.popularItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="text-right py-2">{item.orders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}