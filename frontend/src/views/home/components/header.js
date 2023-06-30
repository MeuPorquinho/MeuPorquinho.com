import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#252525]">
      <nav className="flex items-center justify-between p-3">
        <div className="ml-4 flex items-center">
          <img
            src="https://i.imgur.com/gkAgCgk.png"
            alt="Logo Meu Porquinho"
            className="w-10 h-12 mr-4"
          />
          <h1 className="ml-4 text-xl font-bold text-white">Meu Porquinho</h1>
        </div>
        <ul className="flex space-x-4 mr-20">
          <li>
            <a href="/" className="text-gray-300 hover:text-white text-lg">Início</a>
          </li>
          <li>
            <a href="/sobre" className="text-gray-300 hover:text-white text-lg">Sobre</a>
          </li>
          <li>
            <a href="/logIn" className="text-gray-300 hover:text-white text-lg">Entrar</a>
          </li>
          <li>
            <a href="/signIn" className="text-gray-300 hover:text-white text-lg">Cadastre-se</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
