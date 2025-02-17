'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Orders() {
  const orders = [
    {
      id: 1,
      date: '2022-01-01',
      status: 'completed',
      total: 35.99,
      items: [
        {
          id: 1,
          name: 'Pepperoni Pizza',
          price: 14.99,
          image: '/pizzas/pizza.jpg',
          quantity: 1
        },
        {
          id: 2,
          name: 'Margherita Pizza',
          price: 12.99,
          image: '/pizzas/pizza.jpg',
          quantity: 1
        }
      ]
    },
    {
      id: 2,
      date: '2022-01-05',
      status: 'cancelled',
      total: 12.99,
      items: [
        {
          id: 3,
          name: 'Supreme Pizza',
          price: 16.99,
          image: '/pizzas/pizza.jpg',
          quantity: 1
        }
      ]
    }
  ];
  

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-gray-600">Total Items: {order.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                <p className="font-bold text-lg">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}