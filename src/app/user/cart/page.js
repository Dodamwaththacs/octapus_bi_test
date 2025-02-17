"use client";
import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("pizzaCart")) || [];
    setCartItems(items);

    const cartTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(cartTotal);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("pizzaCart", JSON.stringify(updatedCart));

    const newTotal = updatedCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  const printCart = () => {
    console.log(cartItems);
  };

  const handleCheckout = async () => {
    try {
      // First create the order
      const orderData = {
        customer: session?.user?.name || "string",
        customerEmail: session?.user?.email || "string",
        time: new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        }),
        total: Math.round(total), // Convert to integer if needed
        status: "pending"
      };
  
      const response = await axios.post(
        'http://localhost:8080/api/orders',
        orderData
      );
  
      if (response.status === 201) {
        const orderId = response.data;
        
        const itemPromises = cartItems.map(async (item) => {
          const orderItemData = {
            quantity: item.quantity,
            product: item.id,
            order: orderId,
            price: Math.round(item.price) // Convert to integer if needed
          };
  
          try {
            return await axios.post(
              'http://localhost:8080/api/orderItemss',
              orderItemData
            );
          } catch (error) {
            console.error(`Failed to add item ${item.id}:`, error);
            throw error;
          }
        });
  
        await Promise.all(itemPromises);
  
        localStorage.removeItem("pizzaCart");
        setCartItems([]);
        setTotal(0);
        alert("Order placed successfully!");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
            <button
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
