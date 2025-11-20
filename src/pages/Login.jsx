import { useState, useRef, useEffect } from "react";
import TypewriterTitle from "../hooks/TypewriterTitle";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });
  const notifTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (notifTimer.current) clearTimeout(notifTimer.current);
    };
  }, []);

  const showNotification = (type, message, duration = 3000, callback) => {
    if (notifTimer.current) clearTimeout(notifTimer.current);
    setNotification({ show: true, type, message });
    notifTimer.current = setTimeout(async () => {
      setNotification({ show: false, type: "", message: "" });
      notifTimer.current = null;
      if (callback) await callback();
    }, duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const maybePromise = login(email, password);
      const success = await Promise.resolve(maybePromise);

      if (success) {
        await new Promise((r) => setTimeout(r, 2000));
        showNotification("success", "Login successful!", 5000, () => {
          navigate("/contact-management");
        });
      } else {
        showNotification("error", "Incorrect email or password!");
      }
    } catch {
      showNotification("error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg max-w-xs z-[9999] ${
            notification.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-rose-600 text-white"
          }`}
          role="status"
          aria-live="polite"
        >
          {notification.message}
        </div>
      )}

      <Header />
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-12 py-8 gap-8">
        <div className="hidden lg:flex flex-col gap-6 lg:col-span-7">
          <TypewriterTitle
            words={["Contact Base", "Fast and Efficient", "Managed Better."]}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-tight font-extrabold tracking-tight text-white"
          />
          <p className="max-w-lg text-slate-300 text-sm sm:text-base">
            Sign in to start managing your contacts
          </p>
          <p className="max-w-lg text-slate-300 text-sm sm:text-base">
            Access the contact management panel and manage data more quickly,
            securely, and flexibly.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Link
              to="/register"
              className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#6366f1] text-black font-semibold shadow-lg text-center transition hover:scale-105"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-md w-full bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="mb-4 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Welcome back
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Sign in to continue to your workspace
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-3 sm:px-4 py-2.5 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-300 outline-none disabled:opacity-60 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2.5 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-300 outline-none disabled:opacity-60 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 text-sm"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  disabled={loading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#6366f1] text-black font-semibold shadow-lg flex items-center justify-center gap-3 disabled:opacity-70"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    className="opacity-75"
                  />
                </svg>
              )}
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center mt-2 text-sm text-slate-300">
              Don't have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>

          <div className="mt-6 sm:mt-8 text-center lg:hidden px-2">
            <TypewriterTitle
              words={["Contact Base", "Fast and Efficient"]}
              className="text-lg font-extrabold tracking-tight text-white"
            />
            <p className="text-xs text-slate-400 mt-2">
              Sign in to start managing your contacts — mobile friendly view.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-white/60">
        © {new Date().getFullYear()} Filipia Xena. All rights reserved.
      </footer>
    </div>
  );
}
