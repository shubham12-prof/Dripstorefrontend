import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-12 mt-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-black tracking-widest">DRIP</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Dress to express. Fashion for everyone, everywhere.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Quick Links
          </h3>
          <Link
            to="/"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Cart
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Categories
          </h3>
          <Link
            to="/shop?category=men"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Men
          </Link>
          <Link
            to="/shop?category=women"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Women
          </Link>
          <Link
            to="/shop?category=accessories"
            className="text-sm text-gray-300 hover:text-white transition"
          >
            Accessories
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-xs">
          © 2026 DRIP. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs">
          Built with LOVE using React + AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
