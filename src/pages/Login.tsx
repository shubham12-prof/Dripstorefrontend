import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-black tracking-tight text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm text-center mb-8">
          Login to your DRIP account
        </p>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-2 text-sm focus:outline-none focus:border-black transition"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-bold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
