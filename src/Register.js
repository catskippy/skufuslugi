import React, { useState } from 'react';
import './Login.css';
import logo from './USLUGI.png';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';

const Register = ({ onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const translateError = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Этот email уже используется.';
      case 'auth/invalid-email':
        return 'Неверный формат email.';
      case 'auth/weak-password':
        return 'Слишком слабый пароль. Пароль должен содержать не менее 6 символов.';
      default:
        return 'Произошла ошибка. Попробуйте снова.';
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: name })  // сохраняем имя пользователя
          .then(() => {
            sendEmailVerification(user)
              .then(() => {
                console.log('Письмо с подтверждением отправлено.');
                setError('Регистрация успешна. Проверьте ваш email для подтверждения.');

                setTimeout(() => {
                  window.location.href = 'https://kotekahub.skippy.tw1.ru/';
                }, 3000); // редирект после 3 секунд
              })
              .catch((error) => {
                setError('Не удалось отправить письмо с подтверждением.');
              });
          })
          .catch((error) => {
            setError('Ошибка при сохранении имени пользователя.');
          });
      })
      .catch((error) => {
        setError(translateError(error.code));
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src={logo} alt="скуфуслуги" className="logo-image" />
        </div>
        <h2>Регистрация</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="login-form" onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Имя" 
            required 
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}  // сохраняем введенное имя
          />
          <input 
            type="text" 
            placeholder="Фамилия" 
            required 
            className="input-field" 
          />
          <input 
            type="text" 
            placeholder="Телефон / Email" 
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
          <input 
            type="password" 
            placeholder="Подтвердите пароль" 
            required 
            className="input-field" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Зарегистрироваться</button>
        </form>
        <a href="#" className="cannot-login" onClick={onSwitchToLogin}>Уже есть аккаунт? Войти</a>
      </div>
    </div>
  );
};

export default Register;
