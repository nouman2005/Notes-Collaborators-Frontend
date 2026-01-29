import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/users/register", {
        name,
        email,
        password,
        role,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <form
        onSubmit={submit}
        className='w-full max-w-sm bg-white rounded-2xl shadow-lg p-8'>
        {/* Header */}
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>
            Create Account ✨
          </h2>
          <p className='text-sm text-gray-500 mt-1'>
            Start collaborating on notes
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>
        )}

        {/* Name */}
        <div className='mb-4'>
          <label className='block text-sm text-gray-600 mb-1'>Full Name</label>
          <input
            type='text'
            placeholder='Nouman Ansari'
            className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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
        <div className='mb-4'>
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

        {/* Role */}
        <div className='mb-6'>
          <label className='block text-sm text-gray-600 mb-1'>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none'>
            <option value='editor'>Editor</option>
            <option value='viewer'>Viewer</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        {/* Button */}
        <button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition'>
          Register
        </button>

        {/* Footer */}
        <p className='text-sm text-center text-gray-500 mt-6'>
          Already have an account?{" "}
          <Link
            to='/login'
            className='text-blue-600 hover:underline font-medium'>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
