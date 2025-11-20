import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedLogin = localStorage.getItem("isLoggedIn") === "true";

  const [user, setUser] = useState(storedUser && storedLogin ? storedUser : null);
  const [isLoggedIn, setIsLoggedIn] = useState(storedUser && storedLogin ? true : false);

  const register = (username, email, password) => {
    const newUser = { username, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLoggedIn", "true");
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const login = (email, password) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("isLoggedIn", "true");
      setUser(storedUser);
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
