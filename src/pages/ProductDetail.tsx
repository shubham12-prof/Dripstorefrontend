import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductByIdApi, addToCartApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import type { Product, Size } from "../types";
import { Sparkles, ShoppingBag, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, refreshCartCount } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductByIdApi(Number(id));
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400">Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-400">
        Product not found.{" "}
        <span
          className="underline cursor-pointer text-black"
          onClick={() => navigate("/shop")}
        >
          Go back to shop
        </span>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setError("Please select a size first!");
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      await addToCartApi(product.id, selectedSize, 1);
      setAdded(true);
      setError("");
      await refreshCartCount();
      setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      setError("Failed to add to cart. Try again!");
    }
  };

  const handleAiSuggest = async () => {
    setAiLoading(true);
    setAiSuggestion("");

    const prompt = `I am wearing a ${product.name}. It is a ${product.category} clothing item with tags: ${product.tags.join(", ")}. Suggest 3 complete outfit combinations that go well with this. Keep it short, stylish and practical.`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        },
      );
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiSuggestion(text || "No suggestion received. Try again!");
    } catch (err) {
      setAiSuggestion("Something went wrong. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/shop")}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8"
      >
        <ArrowLeft size={16} />
        Back to Shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-black tracking-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold mt-2">₹{product.price}</p>
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-2 flex-wrap">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div>
            <p className="text-sm font-bold mb-3 uppercase tracking-widest">
              Select Size
            </p>
            <div className="flex gap-3 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size as Size)}
                  className={`w-12 h-12 text-sm font-bold border transition
                    ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition"
          >
            <ShoppingBag size={18} />
            {added
              ? "Added to Cart! ✓"
              : isAuthenticated
                ? "Add to Cart"
                : "Login to Add to Cart"}
          </button>

          <div className="border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-purple-500" />
              <h3 className="font-black text-sm uppercase tracking-widest">
                AI Outfit Suggester
              </h3>
            </div>
            <p className="text-gray-400 text-xs mb-4">
              Not sure what to pair with this? Let AI style you!
            </p>
            <button
              onClick={handleAiSuggest}
              disabled={aiLoading}
              className="w-full bg-purple-600 text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-purple-700 transition disabled:opacity-50"
            >
              {aiLoading ? "Styling you..." : "✨ Get Outfit Suggestion"}
            </button>

            {aiSuggestion && (
              <div className="mt-4 bg-purple-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {aiSuggestion}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
