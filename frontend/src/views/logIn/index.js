import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../home/components/header';
import axios from "axios";

const LogIn = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorRequest, setErrorRequest] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lógica de envio do formulário
    console.log('Dados do formulário enviados:');
    console.log('Email:', e.target.elements.email.value);
    console.log('Senha:', password);


    axios.post("http://localhost:5000/user/login", {
      "username": e.target.elements.email.value,
      "password": password,
    })
      .then(res => {
        console.log(res);
        console.log(res.data);  
        let statusCode = res.status;
        if(statusCode === 200) {
          navigate("/dashboard")
        }     
    }).catch(e => {
        console.log(e);
        setErrorRequest(true);
    });
  };

  return (
    <>
      <Header/>
      <div className="flex items-center justify-center  mt-5 h-200 bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-black rounded-lg px-20 p-8 max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-white">Entrar</h2>
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

export default LogIn;
