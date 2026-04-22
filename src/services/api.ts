import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signupApi = (name: string, email: string, password: string) =>
  api.post("/auth/signup", { name, email, password });

export const loginApi = (email: string, password: string) =>
  api.post("/auth/login", { email, password });

export const getProductsApi = (category?: string) =>
  api.get("/products", { params: category ? { category } : {} });

export const getProductByIdApi = (id: number) => api.get(`/products/${id}`);

export const getCartApi = () => api.get("/cart");

export const addToCartApi = (
  productId: number,
  size: string,
  quantity: number,
) => api.post("/cart", { productId, size, quantity });

export const removeFromCartApi = (id: string) => api.delete(`/cart/${id}`);

export const clearCartApi = () => api.delete("/cart");

export default api;
