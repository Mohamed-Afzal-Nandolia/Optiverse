import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { registerUser } from "../../services/Api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = { name, email, phone, password };

    registerUser(newUser)
      .then((response) => {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Registration failed. Please try again.");
      });
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
          <p className="mt-4 text-center">Join a community where anonymity meets trust.</p>
        </div>

        <div className="p-8 flex flex-col justify-center w-full">
          <h2 className="text-2xl font-bold text-center text-[#001B3A]">Create an Account</h2>
          <p className="text-center text-gray-600 mb-6">Join Optiverse today</p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
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

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#001B3A]"
              />
              <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <button className="w-full py-3 bg-[#001B3A] text-white rounded-lg font-bold hover:bg-[#002B5E] transition-transform transform hover:scale-105">
              Register
            </button>

            <p className="text-center text-gray-600">
              Already have an account? <a href="/login" className="text-[#001B3A] font-bold">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
