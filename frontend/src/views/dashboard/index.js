import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate, useLocation } from "react-router-dom";
import SideMenu from '../../components/SideMenu';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const data = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'R$',
        labelColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(245, 247, 249, 1)',
        borderColor: 'rgba(245, 247, 249, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(238, 191, 4, 1)',
        hoverBorderColor: 'rgba(238, 191, 4, 1)',
        data: [1000, 1500, 1200, 2000, 1800, 2500, 3000, 3500, 4000, 4500, 5000, 5500],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Dinheiro Guardado',
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User: ', user);
    } else {
      navigate("/login")
    }
  }, [user, navigate]);

  return (
    <div className="flex">
      <SideMenu />
      <div className="ml-10 pr-10">
        <div className="pt-10 h-20 pb-4 flex items-center">
          <h1 className="pl-4 text-[32px] font-bold font-plus-jakarta-sans">Bem Vindo à sua Dashboard!</h1>
        </div>
        <div className="flex flex-row flex-wrap items-center">
          <div className="w-[240px] h-[200px] bg-[#292929] rounded-xl shadow-lg m-5 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <FontAwesomeIcon icon={icon({ name: 'wallet' })} size="3x"  style={{ color: 'white' }} />
              <h1 className="text-[32px] font-bold font-dm-sans text-white">R$ 0,00</h1>
              <h1 className="text-[16px] font-bold font-dm-sans text-white">Conta</h1>
            </div>
          </div>
          <div className="w-[240px] h-[200px] bg-white rounded-xl shadow-lg m-5 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <FontAwesomeIcon icon={icon({ name: 'credit-card' })} size="3x"  style={{ color: 'black' }} />
              <h1 className="text-[32px] font-bold font-dm-sans">R$ 0,00</h1>
              <h1 className="text-[16px] font-bold font-dm-sans">Total Gasto</h1>
            </div>
          </div>
          <div className="w-[240px] h-[200px] bg-white rounded-xl shadow-lg m-5 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <FontAwesomeIcon icon={icon({ name: 'piggy-bank' })} size="3x"  style={{ color: 'black' }} />
              <h1 className="text-[32px] font-bold font-dm-sans">R$ 0,00</h1>
              <h1 className="text-[16px] font-bold font-dm-sans">Total Guardado</h1>
            </div>
          </div>
        </div>
        <div className="bottom-0 pb-10 pl-4">
          <Bar data={data} height={312} width={825} options={options}/>
        </div>
      </div>
      <div className="flex flex-col max-w-screen-sm">
        <div className="bg-[#252525]  min-h-screen w-20 items-center justify-center">
          <h1>TEst</h1>
        </div>
      </div> 
    </div>
  );
};

export default Dashboard;
