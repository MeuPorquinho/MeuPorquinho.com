import React, {useContext, useEffect} from 'react';
import SideMenu from '../../components/SideMenu';
import UserContext from '../../context/UserContext';

const FinancialManager = () => {
    const { user } = useContext(UserContext);
    useEffect(() => {
        console.log('User: ', user);
    }, [user]);

    return (
        <SideMenu />
    );
}

export default FinancialManager;