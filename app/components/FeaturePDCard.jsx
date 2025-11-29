"use client";

import React from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const FeaturePDCard = ({
  id,
  name,
  price,
  discountPrice,
  discount,
  rating,
  images,
  createdAt,
  brand,
  category,
}) => {
  const isNew =
    new Date().getTime() - new Date(createdAt).getTime() <
    1000 * 60 * 60 * 24 * 30;

  const renderStars = (ratingValue) => {
    const filledStars = Math.round(ratingValue);
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${
          i < filledStars ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Link href={`/product/${id}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer">
        {/* IMAGE */}
        <div className="relative w-full h-72 overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* DISCOUNT BADGE */}
          {discount > 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow">
              -{discount}%
            </span>
          )}

          {/* NEW BADGE */}
          {isNew && (
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow">
              NEW
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col gap-2">
          {/* Brand + Category */}
          <p className="text-sm text-gray-500">
            {brand} • {category}
          </p>

          {/* Name */}
          <h3 className="text-gray-900 font-semibold text-lg line-clamp-1">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-sm text-gray-500 ml-1">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {discountPrice ? (
              <>
                <p className="text-xl font-bold text-blue-600">
                  ${discountPrice}
                </p>
                <p className="text-sm line-through text-gray-400">${price}</p>
              </>
            ) : (
              <p className="text-xl font-bold text-blue-600">${price}</p>
            )}
          </div>

          {/* ADD TO CART BUTTON */}
          <button className="mt-2 w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-xl hover:bg-blue-500 active:scale-95 transition-all duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FeaturePDCard;
