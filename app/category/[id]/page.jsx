"use client";

import { categories } from "@/app/api/categories";
import { skincareProducts } from "@/app/api/skinData";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import React from "react";
import { use } from "react";

const CategoryPage = ({ params }) => {
  const { id } = React.use(params); // slug
  // FIND CATEGORY OBJECT BY SLUG
  // const category = categories.find((cat) => cat.id === id);

  // If category not found
  // if (!category) {
  //   return (
  //     <div className="px-6 lg:px-12 py-12 text-center">
  //       <h2 className="text-3xl font-bold">Category Not Found {id} </h2>
  //     </div>
  //   );
  // }

  // FILTER PRODUCTS BY CATEGORY NAME
  const products = skincareProducts?.filter((item) => item.category === id);

  return (
    <div className="px-8 lg:px-24 py-16 mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
        {id}
      </h2>

      {products.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No products found in the {id} category.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
