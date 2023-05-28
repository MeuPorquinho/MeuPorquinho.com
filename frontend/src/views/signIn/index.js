import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../../service/generalService";
import UserContext from '../../context/UserContext';
import Header from '../home/components/header';
import Footer from '../home/components/footer';

const RegistrationPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorRequest, setErrorRequest] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('As senhas não correspondem.');
      return;
    }

    try {
      const response = await api('/user/register', 'POST', {
        "username": e.target.elements.email.value,
        "firstName": e.target.elements.name.value,
        "lastName": e.target.elements.lastName.value,
        "password": password,
      })
      console.log(response);
      let statusCode = response.status;
        if(statusCode === 201) {
          const userDate = response.data.user;
          setUser(userDate);
          navigate("/dashboard")
        }     
    } catch (error) {
      console.log(e);
      setErrorRequest(true);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header/>
        {errorRequest && <p className="text-red-500 mt-2">Erro ao cadastrar usuário.</p>}
        <div className="flex-grow flex items-center justify-center mt-5 mb-5 h-200 bg-white">
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
        <Footer/>
      </div>
    </>
  );
};

export default RegistrationPage;
