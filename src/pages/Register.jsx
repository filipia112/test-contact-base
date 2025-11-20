import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
    notifTimer.current = setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
      notifTimer.current = null;
      if (callback) callback();
    }, duration);
  };

  const validate = () => {
    const err = {};
    if (!username.trim()) err.username = "Username wajib diisi.";
    else if (username.length < 8 || username.length > 50)
      err.username = "Username harus 8-50 karakter.";

    if (!email.trim()) err.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      err.email = "Format email tidak valid.";

    if (!password.trim()) err.password = "Kata sandi wajib diisi.";
    else if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}/.test(password))
      err.password = "Kata sandi harus mengandung huruf, angka, dan simbol.";

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const err = validate();
    setErrors(err);

    if (Object.keys(err).length > 0) {
      showNotification("error", "Periksa kembali data Anda");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1500));

      const maybePromise = register(username, email, password);
      const result = await Promise.resolve(maybePromise);

      if (
        (result && typeof result === "object" && result.success) ||
        result === true ||
        result === undefined
      ) {
        showNotification("success", "Pendaftaran berhasil!", 2000, () => {
          navigate("/contact-management");
        });
      } else {
        showNotification("error", "Pendaftaran gagal. Periksa data Anda.");
      }
    } catch {
      showNotification("error", "Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg max-w-xs z-50 ${
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
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-xl bg-slate-800/60 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-extrabold mb-6">Create New Account</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-300 outline-none disabled:opacity-70"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
              {errors.username && (
                <p className="text-rose-400 text-sm mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-300 outline-none disabled:opacity-70"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              {errors.email && (
                <p className="text-rose-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-slate-700 rounded-lg text-white focus:ring-2 focus:ring-teal-300 outline-none disabled:opacity-70"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300"
                  disabled={loading}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <p className="text-rose-400 text-sm mt-1">{errors.password}</p>
              )}
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
              {loading ? "Processing..." : "Sign Up"}
            </button>

            <div className="text-center mt-2 text-sm text-slate-300">
              Already have an account?{" "}
              <Link to="/" className="underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="py-6 text-center text-white/60">
        © {new Date().getFullYear()} Filipia Xena. All rights reserved
      </footer>
    </div>
  );
}
