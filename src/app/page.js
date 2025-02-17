"use client";
import Navbar from "@/components/globalNav";
import Image from "next/image";
import { signIn,signOut,useSession} from "next-auth/react";
import axios from "axios";
import { useEffect,useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [pizzas, setPizzas] = useState([]);
  


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        console.log(response.data);
        setPizzas(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    fetchProducts();
  }
  , []);

  // const pizzas = [
  //   {
  //     id: 1,
  //     name: "Pepperoni Pizza",
  //     price: 14.99,
  //     image: "/pizzas/pizza.jpg",
  //     description:
  //       "Classic pepperoni with mozzarella cheese on our signature crust",
  //   },
  //   {
  //     id: 2,
  //     name: "Margherita Pizza",
  //     price: 12.99,
  //     image: "/pizzas/pizza.jpg",
  //     description: "Fresh tomatoes, mozzarella, basil, and olive oil",
  //   },
  //   {
  //     id: 3,
  //     name: "Supreme Pizza",
  //     price: 16.99,
  //     image: "/pizzas/pizza.jpg",
  //     description: "Loaded with veggies, pepperoni, and Italian sausage",
  //   },
  //   {
  //     id: 4,
  //     name: "BBQ Chicken Pizza",
  //     price: 15.99,
  //     image: "/pizzas/pizza.jpg",
  //     description: "Grilled chicken, BBQ sauce, red onions, and cilantro",
  //   },
  // ];


  const handleAddToCart = () => {
    if (!session) {
      // Show sign-in modal or alert
      const confirmSignIn = window.confirm(
        "You need to sign in to add items to your cart. Would you like to sign in now?"
      );
      if (confirmSignIn) {
        signIn("keycloak", { callbackUrl: "/redirect" });
      }
      return;
    }
  };
  return (
    <div className="">
      <Navbar />
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
                  <span className="text-green-600 font-bold">
                    ${pizza.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{pizza.description}</p>
                <button
                  onClick={handleAddToCart}
                  className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
