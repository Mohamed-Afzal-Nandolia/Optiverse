import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser, loginUser } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const images = [
    "/assets/background/image1.jpg",
    "/assets/background/image2.jpg",
    "/assets/background/image3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (isRegister) {
      registerUser({ name, email, phone, password })
        .then(() => {
          setSuccess("Registration successful! Redirecting to login...");
          setTimeout(() => setIsRegister(false), 2000);
        })
        .catch((error) => {
          setError(error.response?.data?.message || "Registration failed. Please try again.");
        });
    } else {
      loginUser({ email_or_phone: email, password })
        .then((response) => {
          sessionStorage.setItem("token", response.data.token);
          navigate("/home-page");
        })
        .catch(() => {
          setError("Email or Password is incorrect");
        });
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden shadow-lg bg-white bg-opacity-90">
        <div className="hidden md:flex flex-col justify-center items-center bg-[#001B3A] text-white p-8">
          <img src="/assets/logos/Optiverse.png" alt="Optiverse Logo" className="w-24 h-28 mb-4" />
          <h1 className="text-4xl font-bold">Optiverse</h1>
          <p className="mt-4 text-center">
            {isRegister ? "Join a community where anonymity meets trust." : "Connecting communities with anonymity and trust."}
          </p>
        </div>

        <div className="p-8 flex flex-col justify-center w-full">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-500 text-2xl" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-[#001B3A]">
            {isRegister ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {isRegister ? "Join Optiverse today" : "Login to continue"}
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form className="flex flex-col gap-4" onSubmit={handleAuth}>
            {isRegister && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B3A]"
                />
                <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B3A]"
              />
              <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {isRegister && (
              <div className="relative">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B3A]"
                />
                <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B3A]"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button className="w-full py-3 bg-[#001B3A] text-white rounded-lg font-bold hover:bg-[#002B5E] transition-transform transform hover:scale-105">
              {isRegister ? "Register" : "Login"}
            </button>

            <p className="text-center text-gray-600">
              {isRegister ? "Already have an account? " : "Don't have an account? "}
              <span
                onClick={() => setIsRegister(!isRegister)}
                className="text-[#001B3A] font-bold cursor-pointer"
              >
                {isRegister ? "Login" : "Register"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
