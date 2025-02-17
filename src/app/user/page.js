"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function User() {
  const [cart, setCart] = useState([]);
  

  const pizzas = [
    {
      id: 1,
      name: "Pepperoni Pizza",
      price: .99,
      image: "/pizzas/pizza.jpg",
      description:
        "Classic pepperoni with mozzarella cheese on our signature crust",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 12.99,
      image: "/pizzas/pizza.jpg",
      description: "Fresh tomatoes, mozzarella, basil, and olive oil",
    },
    {
      id: 3,
      name: "Supreme Pizza",
      price: 16.99,
      image: "/pizzas/pizza.jpg",
      description: "Loaded with veggies, pepperoni, and Italian sausage",
    },
    {
      id: 4,
      name: "BBQ Chicken Pizza",
      price: 15.99,
      image: "/pizzas/pizza.jpg",
      description: "Grilled chicken, BBQ sauce, red onions, and cilantro",
    },
  ];

  useEffect(() => {
    const savedCart = localStorage.getItem("pizzaCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (pizza) => {
    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === pizza.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...pizza, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("pizzaCart", JSON.stringify(updatedCart));

    alert(`Added ${pizza.name} to cart!`);
  };

  const printCart = () => {
    console.log(localStorage.getItem("pizzaCart"));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Pizza Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pizzas.map((pizza) => (
          <div
            key={pizza.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={pizza.image}
                alt={pizza.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{pizza.name}</h3>
                <span className="text-green-600 font-bold">${pizza.price}</span>
              </div>
              <p className="text-gray-600 text-sm">{pizza.description}</p>
              <button
                onClick={() => addToCart(pizza)}
                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
            <button onClick={printCart}>Print Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
