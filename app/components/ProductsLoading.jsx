const ProductLoading = () => {
  return (
    <div className="px-6 lg:px-12 py-16 max-w-7xl mx-auto animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Left: Image Skeleton */}
        <div className="space-y-4">
          <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
          </div>
        </div>

        {/* Right: Product Info Skeleton */}
        <div className="space-y-4">
          <div className="w-32 h-4 bg-gray-300 rounded"></div> {/* Category */}
          <div className="w-full h-8 bg-gray-300 rounded"></div> {/* Title */}
          <div className="w-24 h-6 bg-gray-300 rounded"></div> {/* Price */}
          <div className="w-full h-24 bg-gray-300 rounded"></div>{" "}
          {/* Description */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-8 bg-gray-300 rounded"></div>{" "}
            {/* Quantity */}
            <div className="w-24 h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="flex gap-4">
            <div className="w-32 h-10 bg-gray-300 rounded"></div>{" "}
            {/* Button 1 */}
            <div className="w-32 h-10 bg-gray-300 rounded"></div>{" "}
            {/* Button 2 */}
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div>
        <div className="w-48 h-6 bg-gray-300 rounded mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 border rounded-lg space-y-4">
              <div className="h-48 w-full bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-8 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLoading;
