"use client";

import { FaTrash, FaHeart } from "react-icons/fa";
import Image from "next/image";

export default function Cart() {
  const cartItems = [
    {
      id: 1,
      name: "Polaroid Camera",
      color: "Classic",
      price: 59.99,
      oldPrice: 75.5,
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Replica Headphones",
      color: "White",
      price: 99.95,
      oldPrice: 150,
      img: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div className=" py-16 px-32 mx-auto p-6 bg-blue-100 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        Your Cart
      </h2>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-xl border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-20 h-20">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500">{item.color}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-lg font-bold text-violet-600">
                    €{item.price}
                  </span>
                  <span className="line-through text-sm text-gray-400">
                    €{item.oldPrice}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end space-y-2">
              <button className="flex items-center text-red-500 hover:text-red-600">
                <FaTrash className="mr-2" /> Remove
              </button>
              <button className="flex items-center text-violet-500 hover:text-violet-600">
                <FaHeart className="mr-2" /> Favorite
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <p className="text-lg text-gray-700">
          Total: <span className="font-bold text-gray-900">€159.94</span>
        </p>
        <div className="flex space-x-4">
          <button className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">
            Back to Shop
          </button>
          <button className="px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
