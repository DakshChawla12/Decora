import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Replace this with your actual backend URL
const BACKEND_URL = "http://localhost:5001";

const VerifyOtpForm = () => {
    const inputRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handlePaste = (e) => {
            e.preventDefault();
            const data = e.clipboardData.getData("text").trim();
            if (/^\d{6}$/.test(data)) {
                data.split("").forEach((char, i) => {
                    if (inputRefs.current[i]) {
                        inputRefs.current[i].value = char;
                    }
                });
                inputRefs.current[5]?.focus();
            }
        };

        inputRefs.current.forEach((input, index) => {
            if (!input) return;

            input.addEventListener("paste", handlePaste);
            input.addEventListener("input", (e) => {
                const value = e.target.value;
                if (value && index < 5) {
                    inputRefs.current[index + 1]?.focus();
                }
            });
            input.addEventListener("keydown", (e) => {
                if (e.key === "Backspace" && !e.target.value && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                }
            });
        });

        return () => {
            inputRefs.current.forEach((input) => {
                input?.removeEventListener("paste", handlePaste);
            });
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        const otp = inputRefs.current.map((input) => input?.value).join("");

        if (!/^\d{6}$/.test(otp)) {
            setError("Please enter a valid 6-digit code.");
            setLoading(false);
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("User ID not found. Please login again.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/user/verify-otp`, {
                userId,
                otp,
            });

            const { user,token } = response.data;
            if (response.data.success) {
                setSuccess("OTP verified successfully!");
                localStorage.setItem("token", token);
                localStorage.setItem("name", user.name || "Username");
                localStorage.setItem("email", user.email || "abc@gmail.com");
                // Optional: redirect to dashboard or home
                setTimeout(() => navigate("/"), 1000);
            } else {
                setError(response.data.message || "Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white text-gray-700 relative flex flex-col items-center w-full max-w-md mx-auto px-6 py-8 md:px-10 md:py-12 text-sm rounded-2xl shadow-xl transition-all my-24"
        >
            <img
                className="h-16 w-16 absolute -top-8 drop-shadow-lg"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/otp/privacyIcon.png"
                alt="privacyIcon"
            />
            <h2 className="text-2xl font-bold mb-2 mt-10 text-center text-gray-800">
                Two-Factor Authentication
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
                Please enter the 6-digit authentication code we sent to your email.
            </p>

            <div className="flex justify-center gap-3 w-full mb-6">
                {[...Array(6)].map((_, i) => (
                    <input
                        key={i}
                        type="text"
                        maxLength={1}
                        required
                        ref={(el) => (inputRefs.current[i] = el)}
                        className="w-12 h-12 rounded-lg border border-gray-300 text-center text-lg outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                ))}
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition duration-300 shadow-sm disabled:opacity-50"
            >
                {loading ? "Verifying..." : "Verify"}
            </button>
        </form>
    );
};

export default VerifyOtpForm;
