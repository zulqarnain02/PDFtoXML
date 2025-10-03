import React, { useState } from "react";
import { apiurl } from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword, ...rest } = formData;
  
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.gender || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    setError(""); // Clear error if validation passes
  
    // Prepare data to send (exclude confirmPassword)
    const dataToSend = { ...rest, password };

    setLoading(true); // Set loading to true
    try {
      const response = await fetch(`${apiurl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Send only relevant data
      });
  
      if (response.ok) {
        alert("Registration successful");
        console.log(await response.json());
  
        // Redirect to login page
        window.location.href = "/login";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };
  

  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-100 to-gray-100 relative flex justify-center items-center overflow-hidden">
      

      {/* Register Box */}
      <div className="bg-white p-12 rounded-lg shadow-lg w-full z-10 text-left max-w-screen-sm min-h-[400px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:opacity-50 hover:cursor-pointer"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
