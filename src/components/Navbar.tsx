import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-black tracking-widest text-black">
        DRIP
      </Link>

      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
        <Link to="/" className="hover:text-black transition">
          Home
        </Link>
        <Link to="/shop" className="hover:text-black transition">
          Shop
        </Link>
        <Link to="/shop?category=men" className="hover:text-black transition">
          Men
        </Link>
        <Link to="/shop?category=women" className="hover:text-black transition">
          Women
        </Link>
        <Link
          to="/shop?category=accessories"
          className="hover:text-black transition"
        >
          Accessories
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/cart" className="relative">
          <ShoppingBag size={22} className="text-black" />
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {totalItems}
          </span>
        </Link>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 flex flex-col px-6 py-4 gap-4 text-sm font-medium text-gray-600 md:hidden">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/shop?category=men" onClick={() => setMenuOpen(false)}>
            Men
          </Link>
          <Link to="/shop?category=women" onClick={() => setMenuOpen(false)}>
            Women
          </Link>
          <Link
            to="/shop?category=accessories"
            onClick={() => setMenuOpen(false)}
          >
            Accessories
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
