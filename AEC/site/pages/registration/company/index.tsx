import React, { useState } from 'react'
import styles from '../../../styles/reg.module.scss'
import { useContext, useEffect } from 'react'
import {checkToken} from '../../../libs/token'
import router from 'next/router'
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import Input from '../../../components/input'

export default function CompanyReg() {
    const [isCompanyExist, setIsCompanyExist] = useState(false)
    

    const { register, handleSubmit } = useForm({
        mode: 'onSubmit',
        // validationSchema: Yup.object({
        //     email: Yup.string().min(3, 'Почта не должна быть короче 3-х символов').required(),
        //     password: Yup.string().min(8, 'Пароль должен быть короче 8-ми символов').required()
        // }),
    });

    const registerCompany = ({companyName, role}) => {
        console.log('Data sending....');
        let companyInfo = {
            isExist: 0,
            companyName: companyName,
            role: role,
            inviteLink: null
        }
        registerUser(companyInfo);
    }
    const joinCompany = ({inviteLink}) => {
        console.log('Data sending....');
        let companyInfo = {
            isExist: 1,
            companyName: '',
            role: "",
            inviteLink: inviteLink
        }
        registerUser(companyInfo);
    }
    const registerUser = async (companyInfo) => {
        checkToken();
        const token = localStorage.getItem('token');
        let body = JSON.stringify({
            token: token, 
            companyInfo: companyInfo
        });
        console.log(body);
        try{
            const res = await fetch('http://127.0.0.1:5000/reg/2', {
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });

            const result = await res.json()
            if(result.status_code != 1){
                console.log("Error");
                router.reload()
            }
            console.log(result);
            if(!isCompanyExist)
                router.push('/registration/aec')
            else router.push('/app')
        } catch(e){
            console.log(e);
        }
        
        // result.user => 'Ada Lovelace'
    }
    function inputChange(e){
        e.preventDefault();
        if(e.target.value!= "")
          e.target.parentNode.classList.add("notEmpty");
        else 
        e.target.parentNode.classList.remove("notEmpty");
    }    
    useEffect(() => {
        checkToken('');
    }, [])
    return (

        <div className={styles.wrapper}>
            <header>
                <button onClick={() => {setIsCompanyExist(false)}} className={!isCompanyExist && styles.selectedTab}>Создать компанию</button>
                <button onClick={() => {setIsCompanyExist(true)}} className={isCompanyExist && styles.selectedTab}>Присоединиться к компании</button>
            </header>
            {!isCompanyExist && 
            <form onSubmit={handleSubmit(registerCompany)} className={styles.form}>
                <div>
                    <Input 
                        id="companyName" 
                        type="name" 
                        name="companyName" 
                        placeholder="Название компании" 
                        register={register}
                    />
                    <Input 
                        id="role" 
                        type="text" 
                        name="role" 
                        placeholder="Должность" 
                        register={register}
                    />
                </div>
                {/* <label htmlFor="companyName">
                    <input type="text" name="companyName" id="companyName" onChange={inputChange} required/>
                    <span>Назание компании</span>
                </label>
                <label htmlFor="role">
                    <input type="text" name="role" id="role" onChange={inputChange} required/>
                    <span>Ваша должность</span>
                </label> */}
                <input className="submit" type="submit" value="Далее"/>
            </form>}
            {isCompanyExist && 
            <form onSubmit={handleSubmit(joinCompany)} className={styles.form}>
                <h5>Регистрация компании</h5>
                <div>
                    <Input 
                        id="inviteLink" 
                        type="text" 
                        name="inviteLink" 
                        placeholder="Ссылка-приглашение" 
                        register={register}
                    />
                </div>
                {/* <label htmlFor="inviteLink">
                    <input type="text" name="inviteLink" id="inviteLink" onChange={inputChange} required/>
                    <span>Ссылка-приглашение</span>
                </label> */}
                <input className="submit" type="submit" value="Далее"/>
            </form>}
        </div>
    )
}
