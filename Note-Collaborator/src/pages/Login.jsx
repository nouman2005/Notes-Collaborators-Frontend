import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post("/users/login", {
        email,
        password,
      });

      login(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <form
        onSubmit={submit}
        className='w-full max-w-sm bg-white rounded-2xl shadow-lg p-8'>
        {/* Header */}
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>Welcome Back 👋</h2>
          <p className='text-sm text-gray-500 mt-1'>
            Sign in to continue to your notes
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>
        )}

        {/* Email */}
        <div className='mb-4'>
          <label className='block text-sm text-gray-600 mb-1'>Email</label>
          <input
            type='email'
            placeholder='you@example.com'
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className='mb-6'>
          <label className='block text-sm text-gray-600 mb-1'>Password</label>
          <input
            type='password'
            placeholder='••••••••'
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition'>
          Login
        </button>

        {/* Footer */}
        <div className='text-center mt-6'>
          <p className='text-sm text-gray-500'>
            Don’t have an account?{" "}
            <Link
              to='/register'
              className='text-blue-600 font-medium hover:underline'>
              Register
            </Link>
          </p>

          <p className='text-xs text-gray-400 mt-2'>
            Secure login • JWT authentication
          </p>
        </div>
      </form>
    </div>
  );
}
