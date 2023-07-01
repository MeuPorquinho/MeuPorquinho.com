import React, { useState, useContext, useEffect } from 'react';
import SideMenu from '../../components/SideMenu';
import UserContext from '../../context/UserContext';
import Input from '../../components/Input';
import Checkbox from '../../components/Checkbox';

const FinancialManager = () => {
    const { user } = useContext(UserContext);
    const [bankBalance, setBankBalance] = useState('');
    const [savedMoney, setSavedMoney] = useState('');
    const [foodIsChecked, setFoodIsChecked] = useState(false);
    const [houseIsChecked, setHouseIsChecked] = useState(false);
    const [carIsChecked, setCarIsChecked] = useState(false);

    const handleBankBalanceChange = (e) => {
        setBankBalance(e.target.value);
    }

    const handleSavedMoneyChange = (e) => {
        setSavedMoney(e.target.value);
    }

    const handleFoodCheckbox = (e) => {
        setFoodIsChecked(e.target.checked);
    }

    const handleHouseCheckbox = (e) => {
        setHouseIsChecked(e.target.checked);
    }

    const handleCarCheckbox = (e) => {
        setCarIsChecked(e.target.checked);
    }

    useEffect(() => {
        console.log('User: ', user);
    }, [user]);

    return (
        <div className='flex'>
            <SideMenu />
            <div className='ml-10 '>
                <h1 className='text-[32px] font-bold font-plus-jakarta-sans mt-10 mb-10'>Gerencie seu dinheiro</h1>
                <div className='flex space-x-16 p-4 '>
                    <Input label='Saldo bancário' placeholder='Digite um valor' value={bankBalance} onChange={handleBankBalanceChange} width={96} />
                    <Input label='Quanto você quer poupar?' placeholder='Digite um valor' value={savedMoney} onChange={handleSavedMoneyChange} width={96} />
                </div>
                <div className='flex space-x-16 p-4 '>
                    <p className='text-[14px] font-bold font-plus-jakarta-sans mt-10 mb-10'>Quais gastos você deseja cadastrar?</p>
                    <Checkbox label='Alimentação' onChange={handleFoodCheckbox} />
                    <Checkbox label='Moradia' onChange={handleHouseCheckbox} />
                    <Checkbox label='Transporte' onChange={handleCarCheckbox} />
                </div>
                <div className='flex space-x-16 p-4 '>
                    {foodIsChecked && <Input label='Gastos com alimentação' placeholder='Digite um valor' value={bankBalance} onChange={handleBankBalanceChange} width={'2/6'} />}
                    {houseIsChecked && <Input label='Gastos com moradia' placeholder='Digite um valor' value={savedMoney} onChange={handleSavedMoneyChange} width={'2/6'} />}
                    {carIsChecked && <Input label='Gastos com transporte' placeholder='Digite um valor' value={savedMoney} onChange={handleSavedMoneyChange} width={'2/6'} />}
                </div>
                <button
                    type="submit"
                    className="flex mx-auto mt-4 w-2/6 py-2 bg-black text-white rounded-md font-bold text-lg hover:bg-gray-800 transition-colors"
                >
                    <div className="mx-auto items-center">Salvar</div>
                </button>
            </div>
        </div>
    );
}

export default FinancialManager;