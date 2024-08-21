import React, { useState } from 'react';
import './Login.css';
import logo from './USLUGI.png';
import { auth } from './firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const Login = ({ onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetEmailSent, setResetEmailSent] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Пользователь успешно вошел в систему
                console.log("Пользователь вошел:", userCredential.user);
            })
            .catch((error) => {
                setError('Неверный email или пароль.');
            });
    };

    const handleForgotPassword = () => {
        if (!email) {
            setError('Пожалуйста, введите ваш email для восстановления пароля.');
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setResetEmailSent(true); // отображаем уведомление об успешной отправке
                setError('');
            })
            .catch((error) => {
                setError('Не удалось отправить письмо для восстановления пароля.');
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src={logo} alt="скуфуслуги" className="logo-image" />
                </div>
                <h2>Вход</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {resetEmailSent && <p style={{ color: 'green' }}>Письмо для восстановления пароля отправлено на ваш email.</p>}
                <form className="login-form" onSubmit={handleLogin}>
                    <input 
                        type="text" 
                        placeholder="Телефон / Email / СНИЛС" 
                        required 
                        className="input-field" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        required 
                        className="input-field" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <a href="#" className="forgot-password" onClick={handleForgotPassword}>Восстановить</a>
                    <button type="submit" className="login-button">Войти</button>
                    <div className="other-login-options">
                        <button type="button" className="qr-code-button">QR-код</button>
                        <button type="button" className="el-signature-button">Эл. подпись</button>
                    </div>
                    <a href="https://discord.gg/8AsXNVYJtv" className="cannot-login">Не удаётся войти?</a>
                </form>
            </div>
            <a href="#" className="register" onClick={onSwitchToRegister}>Зарегистрироваться</a>
        </div>
    );
};

export default Login;
