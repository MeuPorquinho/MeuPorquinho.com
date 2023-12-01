import React, { useState, useContext, useEffect } from 'react';
import SideMenu from '../../components/SideMenu';
import UserContext from '../../context/UserContext';
import Input from '../../components/Input';
import api from '../../service/generalService';
import Swal from 'sweetalert2'
import { isPasswordStrong } from '../../utils/utils';

const FinancialManager = () => {
    const { user, setUser } = useContext(UserContext);
    const [isSaving, setIsSaving] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const updateUserContext = async () => {
        const response = await api('/user/', 'GET');

        for (const key in response.data) {
            if (response.data.hasOwnProperty(key)) {
                const element = response.data[key];

                if (element._id === user._id) {
                    setUser((prevUser) => ({ ...prevUser, username: element.username }));
                }
            }
        }

    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleNewPasswordConfirmationChange = (e) => {
        setNewPasswordConfirmation(e.target.value);
    }

    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);
    }

    const isBothPasswordsValid = () => {
        if (newPassword === '' || newPasswordConfirmation === '') {
            return true;
        }

        if (newPassword === newPasswordConfirmation) {
            return true;
        }

        return false;
    }

    const isEmailValid = () => {
        if (newEmail === '') {
            return true;
        }

        const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');

        if (emailRegex.test(newEmail)) {
            return true;
        }

        return false;
    }

    const updatePassword = async () => {
        if (newPassword === '') {
            return;
        }


        await api(`/user/password`, 'PUT', {
            username: user?.username,
            password: newPassword,
        })

        return;
    }

    const updateEmail = async () => {
        if (newEmail === '') {
            return;
        }

        await api(`/user/email`, 'PUT', {
            username: user?.username,
            email: newEmail,
        })

        return;
    }

    const save = async () => {
        try {

            if (newEmail === '' && newPassword === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Nada a alterar!',
                    text: 'Você não alterou nenhum dado',
                })

                return;
            }

            if (!isPasswordStrong(newPassword) && newPassword !== '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Senha fraca!',
                    text: 'Sua senha deve conter ao menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
                })

                return;
            }

            if (!isEmailValid() && newEmail !== '') {
                Swal.fire({
                    icon: 'error',
                    title: 'E-mail inválido!',
                    text: 'O e-mail digitado não é válido',
                })

                return;
            }

            if (!isBothPasswordsValid()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Senhas não coincidem!',
                    text: 'As senhas digitadas não coincidem',
                })

                return;
            }

            setIsSaving(true);

            await Promise.all([updatePassword(), updateEmail()]).then(async () => {
                await updateUserContext();

                Swal.fire({
                    icon: 'success',
                    title: 'Atualizado com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).finally(() => {
                setIsSaving(false);
            })
        } catch (error) {
            setIsSaving(false);
            console.log('Error: ', error);
        }
    }

    return (
        <div className='flex'>
            <SideMenu />
            <div className='ml-10 w-9/12'>
                <h1 className='text-[32px] font-bold font-plus-jakarta-sans mt-10 mb-10'>Edite seus dados</h1>
                <div className='text-[14px] font-bold font-plus-jakarta-sans flex space-x-16 p-4'>
                    <Input type="password" autoComplete="new-password" id="password" label='Senha' placeholder='Digite sua nova senha' value={newPassword} onChange={handleNewPasswordChange} width={'full'} color={isPasswordStrong(newPassword) ? 'gray-700' : 'red-500'} />
                    <Input type="password" autoComplete="new-password" id="password" label='Confirme sua nova senha' placeholder='Digite sua nova senha' value={newPasswordConfirmation} onChange={handleNewPasswordConfirmationChange} width={'full'} color={isBothPasswordsValid() ? 'gray-700' : 'red-500'} />
                    <Input type="email" autoComplete="off" label='E-mail' placeholder='Digite seu novo e-mail' value={newEmail} onChange={handleNewEmailChange} width={'full'} color={isEmailValid() ? 'gray-700' : 'red-500'} />
                </div>
                <div className="fixed bottom-0 left-0 right-0 flex justify-center mb-4">
                    <button
                        type="submit"
                        className="w-2/6 py-2 bg-[#252525] text-white rounded-md font-bold text-lg hover:bg-black transition-colors flex justify-center items-center"
                        onClick={save}
                    >
                        {isSaving ? (
                            <div className="mx-auto">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            </div>
                        ) : (
                            <div className="mx-auto">Salvar</div>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default FinancialManager;