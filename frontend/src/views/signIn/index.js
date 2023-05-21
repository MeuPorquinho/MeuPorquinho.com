import React, { useState } from 'react';
import Header from '../home/components/header';

const RegistrationPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('As senhas não correspondem.');
      return;
    }

    // Lógica de envio do formulário
    console.log('Dados do formulário enviados:');
    console.log('Nome:', e.target.elements.name.value);
    console.log('Sobrenome:', e.target.elements.lastName.value);
    console.log('Email:', e.target.elements.email.value);
    console.log('Senha:', password);
  };

  return (
    <>
      <Header/>
      <div className="flex items-center justify-center h-screen bg-white">
        <form
          onSubmit={handleSubmit}
          className="bg-black rounded-lg px-20 p-8 max-w-lg w-1000"
        >
          <h2 className="text-2xl font-bold mb-2 text-center text-white">Cadastro</h2>
          <div className="mb-2">
            <label htmlFor="name" className="block mb-2 text-white">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastName" className="block mb-2 text-white">
              Sobrenome
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
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
          <div className="mb-2">
            <label htmlFor="confirmPassword" className="block mb-2 text-white">
              Confirme a Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-rose-300 text-white rounded-md font-bold text-lg hover:bg-rose-500 transition-colors"
          >
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
