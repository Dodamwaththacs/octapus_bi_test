'use client';
import { useState } from 'react';

export default function ManageProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Pepperoni Pizza",
      price: 14.99,
      image: "/pizzas/pizza.jpg",
      description: "Classic pepperoni with mozzarella cheese on our signature crust",
      ingredients: [
        { id: 1, name: "Cheese" },
        { id: 2, name: "Onion" },
        { id: 3, name: "Pepperoni" },
        { id: 4, name: "Tomato Sauce" }
      ]
    }
  ]);

  const [newIngredient, setNewIngredient] = useState("");

  const handleUpdateProduct = (productId, field, value) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return { ...product, [field]: value };
      }
      return product;
    }));
  };

  const addIngredient = (productId) => {
    if (!newIngredient.trim()) return;
    
    setProducts(products.map(product => {
      if (product.id === productId) {
        const newId = Math.max(...product.ingredients.map(i => i.id)) + 1;
        return {
          ...product,
          ingredients: [...product.ingredients, { id: newId, name: newIngredient }]
        };
      }
      return product;
    }));
    setNewIngredient("");
  };

  const removeIngredient = (productId, ingredientId) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          ingredients: product.ingredients.filter(i => i.id !== ingredientId)
        };
      }
      return product;
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
      
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleUpdateProduct(product.id, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleUpdateProduct(product.id, 'price', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={product.description}
                  onChange={(e) => handleUpdateProduct(product.id, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  rows="3"
                />
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={product.image}
                  onChange={(e) => handleUpdateProduct(product.id, 'image', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                <div className="mt-2 space-y-2">
                  {product.ingredients.map(ingredient => (
                    <div key={ingredient.id} className="flex items-center justify-between">
                      <span>{ingredient.name}</span>
                      <button
                        onClick={() => removeIngredient(product.id, ingredient.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="New ingredient"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => addIngredient(product.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
              Save Changes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}