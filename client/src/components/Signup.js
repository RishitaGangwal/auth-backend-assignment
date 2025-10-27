import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();

 const handleSignup = async () => {
   if (!name || !email || !password || !confirmPassword) {
     alert("Please fill in all fields");
     return;
   }

   if (password !== confirmPassword) {
     alert("Passwords do not match");
     return;
   }

   if (!agreedToTerms) {
     alert("Please agree to the terms and conditions");
     return;
   }

   setLoading(true);

   try {
     const res = await api.signup({ name, email, password });

     if (res && res.email) {
  alert("✅ User registered successfully! Please continue to fill basic info.");
  localStorage.setItem("email", res.email); 
  navigate("/profile"); 
     } else {
       alert(res.message || "Registration failed");
     }
   } catch (err) {
     console.error("Signup error:", err);
     alert("Something went wrong during signup");
   } finally {
     setLoading(false);
   }
 };


  const handleLoginClick = () => {
    navigate("/login");
    alert("Navigate to login page");
  };

  const getPasswordStrength = () => {
    if (!password) return { text: "", color: "" };
    if (password.length < 6) return { text: "Weak", color: "text-red-500" };
    if (password.length < 10)
      return { text: "Medium", color: "text-yellow-500" };
    return { text: "Strong", color: "text-green-500" };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join us today and get started</p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
            {password && (
              <p className={`text-xs mt-1 font-medium ${strength.color}`}>
                Password strength: {strength.text}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSignup()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs mt-1 font-medium text-red-500">
                Passwords do not match
              </p>
            )}
          </div>

          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-600 cursor-pointer"
            >
              I agree to the{" "}
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Terms and Conditions
              </button>{" "}
              and{" "}
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Privacy Policy
              </button>
            </label>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
              className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>

      
      </div>
    </div>
  );
}

export default Signup;
