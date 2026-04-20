import { createContext, useContext, useState } from "react";
import type { CartItem, Product, Size } from "../types";
import type { ReactNode } from "react";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: Size) => void;
  removeFromCart: (productId: number, size: Size) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size: Size) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number, size: Size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size),
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
