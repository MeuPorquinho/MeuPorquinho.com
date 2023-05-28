import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      console.log('User: ', user);
    } else {
      navigate("/login")
    }
  }, [user]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('As senhas não correspondem.');
      return;
    }

  };

  return (
    <>
      <div className="flex items-center justify-center  mt-5 h-200 bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-black rounded-lg px-20 p-8 max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-white">Dashboard test</h2>
          <div className="mb-2">
            <label htmlFor="email" className="block mb-2 text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block mb-2 text-white">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-rose-300 text-white rounded-md font-bold text-lg hover:bg-rose-500 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
