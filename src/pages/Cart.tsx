import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCartApi, removeFromCartApi, clearCartApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Trash2, ShoppingBag } from "lucide-react";

interface CartItemFromApi {
  id: string;
  size: string;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState<CartItemFromApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await getCartApi();
      setCartItems(res.data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeFromCartApi(id);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCartApi();
      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart", error);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-400">Loading cart...</div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
        <ShoppingBag size={64} className="text-gray-200" />
        <h2 className="text-2xl font-black tracking-tight">
          Your cart is empty
        </h2>
        <p className="text-gray-400 text-sm">
          Looks like you haven't added anything yet.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-12 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-black tracking-tight">Your Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-xs text-gray-400 uppercase tracking-widest hover:text-red-500 transition"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-6 items-center border-b border-gray-100 pb-6"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-xl cursor-pointer"
              onClick={() => navigate(`/product/${item.product.id}`)}
            />

            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{item.product.name}</h3>
              <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">
                Size: {item.size}
              </p>
              <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
              <p className="font-bold text-gray-900 mt-2">
                ₹{item.product.price * item.quantity}
              </p>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="text-gray-300 hover:text-red-500 transition"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm uppercase tracking-widest">
            Total
          </span>
          <span className="text-2xl font-black">₹{total}</span>
        </div>
        <button
          onClick={() => alert("Checkout coming soon!")}
          className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={() => navigate("/shop")}
          className="w-full border border-gray-300 text-gray-600 py-4 font-bold uppercase tracking-widest hover:border-black hover:text-black transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;
