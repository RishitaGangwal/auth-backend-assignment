import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
function AddCard() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");

  const navigate = useNavigate();

  const handleAddCard = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("No email found. Please verify first.");
      return;
    }

    const res = await api.addCard({
      email,
      cardNumber,
      expiryMonth,
      expiryYear,
    });
    alert(res.message || "Card added!");
    navigate("/cards");
  };


  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value);
    }
  };

  const handleMonthChange = (e) => {
    const value = e.target.value;
    if (value.length <= 2 && /^\d*$/.test(value)) {
      setExpiryMonth(value);
    }
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setExpiryYear(value);
    }
  };

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            Add New Card
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formatCardNumber(cardNumber)}
                  onChange={handleCardNumberChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors font-mono"
                  maxLength="19"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Month
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM"
                    value={expiryMonth}
                    onChange={handleMonthChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors font-mono"
                    maxLength="2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Year
                </label>
                <input
                  type="text"
                  placeholder="YYYY"
                  value={expiryYear}
                  onChange={handleYearChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors font-mono"
                  maxLength="4"
                />
              </div>
            </div>

            <button
              onClick={handleAddCard}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
            >
              Add Card
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default AddCard;
