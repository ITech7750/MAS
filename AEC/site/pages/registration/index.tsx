import router from 'next/router'
import React from 'react'
import styles from '../../styles/reg.module.scss'
import toast, { Toaster } from 'react-hot-toast'
import Input from '../../components/input';
import { useForm } from 'react-hook-form';
import * as Yup from "yup";

export default function Registration() {
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        // validationSchema: Yup.object({
        //     email: Yup.string().min(3, 'Почта не должна быть короче 3-х символов').required(),
        //     password: Yup.string().min(8, 'Пароль должен быть короче 8-ми символов').required()
        // }),
    });
    const registerUser = async ({surname, name, patronymic, email, password, repeatpassword}) => {
        event.preventDefault()
        let data = event.target;
        if(password.length < 8){
            console.log('length');
            toast('Пароль слишком короткий');
            return
        }
        if(password != repeatpassword){
            // console.log(data.password.value, ' : ', data.repeatpassword.value);
            
            toast('Пароли не совпадают');
            return
        }
        console.log('Data sending....');
        let body = JSON.stringify({
            surname: surname,
            name: name,
            patronymic: patronymic,
            email: email,
            password: password,
        });
        console.log(body);
        
        try{
            const res = await fetch('http://127.0.0.1:5000/reg/1', {
            body: body,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });

        const result = await res.json()
        console.log(result);
        if(result.status_code == 0){
            toast("Email уже зарегестрирован");
            return
        }
        localStorage.setItem('token', result.token);
        router.push('/registration/company')
        }
        catch(e){
            alert(e);
            router.reload();
        }
    }
    /*function inputChange(e){
        e.preventDefault();
        if(e.target.value!= "")
          e.target.parentNode.classList.add("notEmpty");
        else 
        e.target.parentNode.classList.remove("notEmpty");
    }    */
    return (
        <div className={styles.wrapper}>
            <form onSubmit={handleSubmit(registerUser)} className={styles.form}>
                <div>
                    <h5>Регистрация</h5>
                    <Input 
                        id="surname" 
                        type="surname" 
                        name="surname" 
                        placeholder="Фамилия" 
                        register={register}
                    />
                    <Input 
                        id="name" 
                        type="name" 
                        name="name" 
                        placeholder="Имя" 
                        register={register}
                    />
                    <Input 
                        id="patronymic" 
                        type="patronymic" 
                        name="patronymic" 
                        placeholder="Отчество" 
                        register={register}
                    />

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
                    <Input 
                        id="repeatpassword" 
                        type="password" 
                        name="repeatpassword" 
                        placeholder="Повторите пароль" 
                        register={register}
                    />
                </div>
                
                {/* <label htmlFor="surname">
                    <input type="text" name="surname" id="surname" onChange={inputChange} required/>
                    <span>Ваша фамилия</span>
                </label>
                <label htmlFor="name">
                    <input type="text" name="name" autoComplete="name" id="name" onChange={inputChange} required/>
                    <span>Ваше имя</span>
                </label>
                <label htmlFor="patronymic">
                    <input type="text" name="patronymic" id="patronymic" onChange={inputChange} required/>
                    <span>Ваше отчество</span>
                </label>
                
                <label htmlFor="email">
                <input type="email" name="email" id="email" onChange={inputChange} required/>
                    <span>Email</span>
                </label>
                <label htmlFor="password">
                    <input type="password" name="password" id="password" onChange={inputChange} required/>
                    <span>Пароль</span>
                </label>
                <label htmlFor="repeatpassword">
                    <input type="password" name="repeatpassword" id="repeatpassword" onChange={inputChange} required />
                    <span>Повторите пароль</span>
                </label> */}
                <input className="submit" type="submit" value="Зарегистрироваться"/>
                <input type="submit" value="Перейти ко входу"></input>
            </form>
            <Toaster />
        </div>
    )
}
