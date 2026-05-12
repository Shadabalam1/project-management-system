import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/slices/authSlice";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRequestingForToken } = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      return setError("Email is required");
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email");
    }

    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setIsSubmitted(true);
      setSuccess("Password reset link has been sent to your email.");
      setEmail("");
    } catch (err) {
      setError(err?.payload?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Section */}
        <div className="px-8 pt-8 pb-6 text-center">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <div className="relative">
                {/* Arrow */}
                <div className="absolute -top-7 left-0 w-14 h-3 bg-blue-500 rounded-full">
                  <div className="absolute right-[-8px] top-[-4px] w-0 h-0 border-t-[10px] border-b-[10px] border-l-[14px] border-t-transparent border-b-transparent border-l-blue-500"></div>
                </div>
                {/* Box */}
                <div className="w-16 h-16 border-[5px] border-white rounded-2xl relative">
                  {/* Checklist */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="w-6 h-[3px] bg-blue-300 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="w-6 h-[3px] bg-green-300 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <div className="w-6 h-[3px] bg-yellow-300 rounded-full"></div>
                    </div>
                  </div>
                  {/* Check */}
                  <div className="absolute bottom-2 left-3 w-8 h-4 border-l-[5px] border-b-[5px] border-blue-400 rotate-[-45deg]"></div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-extrabold mt-4">
              Task<span className="text-blue-600">Flow</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Plan. Track. Complete.
            </p>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">
            Forgot Password
          </h2>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Enter your email and we'll send you a secure
            password reset link.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitted}
                  className={`w-full pl-12 pr-4 py-3 border ${
                    isSubmitted ? 'bg-gray-100' : ''
                  } border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl">
                {success}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={isRequestingForToken || isSubmitted}
              className={`w-full ${
                isSubmitted ? 'bg-gray-300 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
              } text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
            >
              {isRequestingForToken ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : isSubmitted ? (
                "Reset Link Sent"
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          {/* Back */}
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-600 hover:text-blue-600 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;