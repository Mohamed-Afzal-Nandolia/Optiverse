import React, { useState, useEffect } from "react";
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  // Array of background images
  const images = [
    "/assets/background/image1.jpg",
    "/assets/background/image2.jpg",
    "/assets/background/image3.jpg",
  ];

  // Background image slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Check localStorage on component load
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home-page"); // Redirect if already logged in
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlelogin = (e) => {
    e.preventDefault();

    const LoginDetails = {
      email_or_phone: email,
      password: password,
    };

    console.log(LoginDetails);

    loginUser(LoginDetails)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home-page");
      })
      .catch((error) => {
        console.error("Email or Password is incorrect");
        setError(error.response?.data?.message || "Login failed. Please try again.");
      });
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `url(${images[currentImage]})`,
      }}
    >
      <div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden shadow-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#001B3A] text-white p-8">
          <img
            src="/assets/logos/Optiverse.png"
            alt="Optiverse Logo"
            className="w-24 h-28 mb-4"
          />
          <h1 className="text-4xl font-bold">Optiverse</h1>
          <p className="mt-4 text-center">Connecting communities with anonymity and trust.</p>
        </div>

        {/* Right Side (Login Form) */}
        <div className="p-8 flex flex-col justify-center w-full">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUser className="text-gray-500 text-2xl" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-[#001B3A]">Welcome Back</h2>
          <p className="text-center text-gray-600 mb-6">Login to continue</p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="flex flex-col gap-4" onSubmit={handlelogin}>
            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B3A]"
              />
              <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Password Input with Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
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
              Login
            </button>

            <p className="text-center text-gray-600">
              Don't have an account? <a href="/register" className="text-[#001B3A] font-bold">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
