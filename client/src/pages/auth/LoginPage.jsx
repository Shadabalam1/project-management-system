import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggingIn, authUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific field error when user types
    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(login(formData));
  };

  useEffect(() => {
    if (authUser) {
      switch (authUser.role) {
        case "student":
          navigate("/student");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          navigate("/dashboard"); // fallback route
      }
    }
  }, [authUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
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

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error.email && (
          <p className="text-red-500 text-sm mb-2">{error.email}</p>
        )}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error.password && (
          <p className="text-red-500 text-sm mb-2">{error.password}</p>
        )}

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>

        {/* Forgot Password */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoggingIn}
          className="w-full bg-black hover:bg-gray-900 transition-all duration-300 text-white p-3 rounded-lg font-semibold"
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;