import { useNavigate, useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import type { Category } from "../types";

const categories: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Accessories", value: "accessories" },
];

const Shop = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <h1 className="text-3xl font-black tracking-tight text-center mb-10">
        Shop All
      </h1>

      <div className="flex gap-3 justify-center mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              cat.value === "all"
                ? setSearchParams({})
                : setSearchParams({ category: cat.value })
            }
            className={`px-6 py-2 text-sm font-bold uppercase tracking-widest border transition
              ${
                selectedCategory === cat.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1">₹{product.price}</p>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                  {product.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
