import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function CardsList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const res = await api.getCards();
      setCards(res);
    };
    fetchCards();
  }, []);

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Your Cards
        </h1>

        {cards.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-gray-600 text-lg">No cards added yet.</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {cards.map((card, idx) => (
              <li
                key={idx}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-white">
                  <div className="mb-6">
                    <div className="text-sm opacity-80 mb-2">CARD NUMBER</div>
                    <div className="font-mono text-2xl tracking-wider">
                      {card.cardNumber.replace(/(.{4})/g, "$1 ").trim()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80 mb-2">EXPIRY DATE</div>
                    <div className="font-mono text-xl">
                      {card.expiryMonth}/{card.expiryYear}
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">
                    Card:{" "}
                    <span className="font-semibold text-gray-900">
                      {card.cardNumber}
                    </span>{" "}
                    | Expiry:{" "}
                    <span className="font-semibold text-gray-900">
                      {card.expiryMonth}/{card.expiryYear}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CardsList;
