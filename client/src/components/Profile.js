import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function Profile() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

    const navigate = useNavigate();     

  const handleSave = async () => {
    if (!name || !dob || !address) {
      alert("Please fill in all required fields");
      return;
    }

    // If email is part of your form, store it here
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Email not found. Please signup first.");
      navigate("/signup");
      return;
    }

    setLoading(true);
    try {
      const res = await api.saveBasicInfo({ name, dob, address, email });
      if (res.message === "Basic info saved") {
        alert("✅ Profile saved! Proceed to OTP.");
        navigate("/verify"); 
      } else {
        alert(res.message || "Failed to save profile");
      }
    } catch (err) {
      console.error("Error saving basic info:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    alert("Logging out...");
     navigate("/login");
  };

  const calculateAge = () => {
    if (!dob) return "";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age > 0 ? `${age} years old` : "";
  };

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Complete Your Profile</h1>
              <p className="text-gray-600 mt-1">Help us know you better</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Logout
            </button>
          </div>
      
          <div className="py-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
              />
              {dob && calculateAge() && (
                <p className="text-xs text-gray-500 mt-1">{calculateAge()}</p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                rows="3"
                placeholder="Enter your complete address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
              />
            </div>

          
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-teal-800">
                    After saving your profile, you'll receive an OTP for verification.
                  </p>
                </div>
              </div>
            </div>

           
            <div className="flex gap-3 pt-4">
            <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? "Saving..." : "Save & Continue"}
              </button>
            </div>
          </div>
       
      </div>
    </div>
    </div>
  );
}

export default Profile;