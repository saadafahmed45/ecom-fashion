import Link from "next/link";
import { skincareProducts } from "../api/skinData";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const products = skincareProducts;

  return (
    <div className=" mx-auto px-6 md:px-24 py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-black">
              Home
            </Link>
          </li>
          <span>/</span>
          <li>
            <Link href="/skincare" className="hover:text-black">
              Skincare
            </Link>
          </li>
          <span>/</span>
          <li className="font-semibold text-gray-900">Products</li>
        </ol>
      </div>

      {/* Page Title */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Skincare Products</h2>
        <p className="text-gray-600 mt-2">Showing {products.length} products</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
