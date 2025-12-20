import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function UserDetailsPopup({ open, onClose, onSubmit }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    // VALIDATION
    if (!name.trim()) {
      return setError("Please enter your full name.");
    }
    if (!email.trim() || !email.includes("@")) {
      return setError("Please enter a valid email address.");
    }
    if (!phone.trim() || phone.length < 10) {
      return setError("Please enter a valid phone number.");
    }

    setError(""); // clear errors before sending
    onSubmit({ name, email, phone });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl relative">

        {/* Close Button */}
        <button className="absolute right-4 top-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Enter Your Details
        </h2>

        {/* Validation Error Message */}
        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-primary outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-primary outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-primary outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <Button
          className="w-full mt-6 bg-green-500 hover:bg-green-600 font-semibold text-black py-3"
          onClick={handleSubmit}
        >
          Continue for Resources
        </Button>
      </div>
    </div>
  );
}
