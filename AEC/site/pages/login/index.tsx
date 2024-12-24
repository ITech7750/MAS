import { useState, useEffect } from 'react';
import styles from '../../styles/reg.module.scss';
import Router from 'next/router';
import Input from '../../components/input';
import toast from 'react-hot-toast';
import { useForm } from "react-hook-form";

function Login() {
    const { register, handleSubmit } = useForm();

    // Функция отправки данных на сервер
    const loginUser = async (data) => {
        console.log('Отправка данных на сервер...');
        
        // Формируем тело запроса в формате, ожидаемом бэкендом
        let body = JSON.stringify({
            data: {
                login: data.email,
                password: data.password,
            }
        });

        console.log(body);

        try {
            const res = await fetch('http://127.0.0.1:5000/login', {
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            });

            if (res.ok) {
                const result = await res.json();
                console.log(result);

                if (result.comment === "Bad Password") {
                    toast.error("Неверный пароль!");
                } else if (result.comment === "User not found") {
                    toast.error("Пользователь не найден!");
                } else if (result.comment === "OK") {
                    localStorage.setItem('token', result.token);
                    toast.success("Успешный вход!");
                    Router.push('/app/');
                } else {
                    toast.error("Неизвестная ошибка. Свяжитесь с организаторами.");
                    Router.reload();
                }
            } else {
                toast.error(`Ошибка сервера: ${res.status}`);
            }
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error);
            toast.error("Ошибка подключения к серверу.");
        }
    };

    useEffect(() => {
        // Проверка токена в localStorage
        async function checkToken() {
            const token = await localStorage.getItem('token');
            if (token) Router.push('/app/');
        }
        checkToken();
    }, []);

    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(loginUser)} className={styles.form}>
                <h5>Вход в аккаунт</h5>
                <div>
                    <Input 
                        id="email" 
                        type="email" 
                        name="email" 
                        placeholder="Почта" 
                        register={register}
                    />
                    <Input 
                        id="password" 
                        type="password" 
                        name="password" 
                        placeholder="Пароль" 
                        register={register}
                    />
                </div>
                <input className="submit" type="submit" value="Войти" />
            </form>
        </div>
    );
}

export default Login;
