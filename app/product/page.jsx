"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 12;

  const fetchProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );

      if (response.data.length < limit) setHasMore(false);

      setProducts((prev) => [...prev, ...response.data]);
      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        fetchProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const renderStars = (count = 5) => {
    return Array.from({ length: count }, (_, i) => (
      <FaStar key={i} className="text-yellow-400 w-4 h-4" />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(({ id, title, price, images, creationAt }) => {
          const isNew =
            new Date().getTime() - new Date(creationAt).getTime() <
            1000 * 60 * 60 * 24 * 30; // less than 30 days

          return (
            <Link key={id} href={`/product/${id}`}>
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden cursor-pointer transition duration-300">
                {/* Image */}
                <div className="relative w-full h-72 overflow-hidden">
                  <img
                    src={images[0]}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110"
                  />

                  {/* Quick View Button */}
                  <button className="absolute top-3 right-3 px-3 py-1 text-sm bg-white rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View
                  </button>

                  {/* New Badge */}
                  {isNew && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
                      NEW
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {title}
                  </h3>

                  <div className="flex items-center mt-1">{renderStars(5)}</div>

                  <p className="text-blue-600 font-bold mt-2">${price}</p>

                  <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          );
        })}

        {loading && (
          <div className="col-span-full text-center text-gray-500">
            Loading more products...
          </div>
        )}

        {!hasMore && (
          <div className="col-span-full text-center text-gray-400">
            No more products
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
