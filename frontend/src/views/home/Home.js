import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header';
import Main from './components/main';

const Home = () =>{
  return (
    <div>
      <Header/>
      <Main/>
    </div>
  );
}

export default Home;