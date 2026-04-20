export type Category = "men" | "women" | "accessories";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  sizes: Size[];
  image: string;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  size: Size;
  quantity: number;
}
