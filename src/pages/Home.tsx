import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-black text-white px-6 py-24 flex flex-col items-center text-center gap-6">
        <span className="text-xs tracking-widest uppercase text-gray-400">
          New Arrivals 2024
        </span>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          Dress to Express
        </h1>
        <p className="text-gray-400 max-w-md text-sm">
          Discover the latest trends in fashion. From streetwear to elegance —
          find your style at DRIP.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-4 bg-white text-black px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition"
        >
          Shop Now
        </button>
      </section>

      <section className="px-6 py-16">
        <h2 className="text-2xl font-black text-center mb-10 tracking-tight">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { label: "Men", color: "bg-gray-900", category: "men" },
            { label: "Women", color: "bg-pink-900", category: "women" },
            {
              label: "Accessories",
              color: "bg-stone-700",
              category: "accessories",
            },
          ].map((cat) => (
            <div
              key={cat.category}
              onClick={() => navigate(`/shop?category=${cat.category}`)}
              className={`${cat.color} text-white rounded-xl p-12 flex items-center justify-center cursor-pointer hover:opacity-80 transition`}
            >
              <span className="text-2xl font-black tracking-widest uppercase">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <h2 className="text-2xl font-black text-center mb-10 tracking-tight">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-gray-500 text-sm mt-1">₹{product.price}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  className="mt-4 w-full bg-black text-white py-2 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
