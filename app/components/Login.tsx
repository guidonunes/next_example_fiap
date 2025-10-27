'use client';

import { useState } from 'react';
import { useAuth } from '../lib/auth';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { login, logout, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (!success) {
      setError('Invalid username or password');
    } else {
      setUsername('');
      setPassword('');
      setShowModal(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleCancel = () => {
    setShowModal(false);
    setUsername('');
    setPassword('');
    setError('');
  };

  if (isAuthenticated) {
    return (
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 transition-colors"
      >
        <FaSignInAlt />
        <span>Login</span>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-black border p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-amber-300 font-semibold  mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border rounded text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-amber-300 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded text-white"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors"
                >
                  <FaSignInAlt />
                  <span>Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

