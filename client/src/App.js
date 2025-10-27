import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import OTP from "./components/OTP";
import AddCard from "./components/AddCard";
import CardsList from "./components/CardsList";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify" element={<OTP />} />
        <Route path="/add-card" element={<AddCard />} />
        <Route path="/cards" element={<CardsList />} />
      </Routes>
    </div>
  );
}

export default App;
