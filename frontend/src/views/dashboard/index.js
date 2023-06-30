import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate, useLocation } from "react-router-dom";
import SideMenu from '../../components/SideMenu';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      console.log('User: ', user);
    } else {
      navigate("/login")
    }
  }, [user]);

  useEffect(() => {
    console.log(location.pathname);
  }, []);

  return (
    <>
      <SideMenu />
      <div className="abslute top-0 ml-10 bg-black">
          <h1>Dashboard</h1>
      </div>

    </>
  );
};

export default Dashboard;
