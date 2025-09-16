"use client";
import ProductLoading from "@/app/components/ProductsLoading";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products_details = ({ params }) => {
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        const prod = response.data;
        setProduct(prod);
        setSelectedImage(prod.images?.[0]);

        // Fetch related products
        if (prod.category?.id) {
          const relatedRes = await axios.get(
            `https://api.escuelajs.co/api/v1/categories/${prod.category.id}/products`
          );
          setRelatedProducts(
            relatedRes.data.filter((p) => p.id !== prod.id).slice(0, 4)
          );
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <ProductLoading />;
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-12 py-16 max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-8">
        <ul className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link
              href={`/category/${product.category?.id}`}
              className="hover:text-blue-600 capitalize"
            >
              {product.category?.name || "Category"}
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-800 font-medium truncate max-w-[150px]">
            {product.title}
          </li>
        </ul>
      </nav>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Left: Image Gallery */}
        <div>
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <img
              src={selectedImage}
              alt={product.title}
              className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="flex gap-4 mt-4">
            {product.images?.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 border rounded-lg overflow-hidden transition ring-offset-2 ${
                  selectedImage === img
                    ? "ring-2 ring-blue-500"
                    : "hover:ring-2 hover:ring-gray-300"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {product.category?.name}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
            {product.title}
          </h1>
          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ${product.price}
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>
          <div className="flex items-center mb-6">
            <label className="mr-4 font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 border rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
              Add to Cart
            </button>
            <button className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-medium text-gray-700 transition duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg shadow-sm hover:shadow-md transition duration-300 p-4 flex flex-col"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-semibold mt-2">
                  ${item.price}
                </p>
                <Link
                  href={`/product/${item.id}`}
                  className="mt-auto bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded transition duration-300 text-sm text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products_details;
