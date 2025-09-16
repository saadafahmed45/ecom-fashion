"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CategoryPage = ({ params }) => {
  const { id } = params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/categories/${id}/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center py-12 text-gray-500">Loading products...</p>
    );
  }

  return (
    <div className="px-6 lg:px-12 py-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              {/* Product Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h3>
                <p className="text-blue-600 font-bold mt-2">${product.price}</p>

                <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
