import React, { useState } from 'react'
import styles from '../../../styles/reg.module.scss'
import { useContext, useEffect } from 'react'
import {checkToken} from '../../../libs/token'
import router from 'next/router'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form"
import * as Yup from "yup"
import Input from '../../../components/input'

export default function CompanyReg() {
    const [isCompanyExist, setIsCompanyExist] = useState(false)
    const { register, handleSubmit } = useForm({
        mode: 'onSubmit'
    });
    const registerCompany = ({companyName}) => {
        console.log('Data sending....');
        let companyInfo = {
            'InviteLink': null,
            'AECName': companyName
        }
        registerUser(companyInfo);
    }
    const joinCompany = ({inviteLink}) => {
        console.log('Data sending....');
        let companyInfo = {
            'InviteLink': inviteLink,
            'AECName': null
        }
        registerUser(companyInfo);
    }
    const registerUser = async (companyInfo) => {
        checkToken();
        const token = localStorage.getItem('token');
        let _token = {
            token: token
        };
        const returnedTarget = Object.assign(_token, companyInfo);
        let body = JSON.stringify((returnedTarget));
        console.log(body);
        
        try{
            const res = await fetch('http://127.0.0.1:5000/reg/3', {
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            });

            const result = await res.json()
            console.log(result);
            if(result.status_code == 1)
                router.push('/app')
            else if(result.status_code == 0){
                toast("Ссылка не действительна")
            } 
            else{
                console.log("Error");
                router.reload()
            }
        } catch(e){
            console.log(e);
        }
        
        // result.user => 'Ada Lovelace'
    }
    /*function inputChange(e){
        e.preventDefault();
        if(e.target.value!= "")
          e.target.parentNode.classList.add("notEmpty");
        else 
        e.target.parentNode.classList.remove("notEmpty");
    }    */
    useEffect(() => {
        checkToken('');
    }, [])
    return (

        <div className={styles.wrapper}>
            <header>
                <button onClick={() => {setIsCompanyExist(false)}} className={!isCompanyExist && styles.selectedTab}>Создать АЭК</button>
                <button onClick={() => {setIsCompanyExist(true)}} className={isCompanyExist && styles.selectedTab}>Присоединиться к АЭК</button>
            </header>
            {!isCompanyExist && 
            <form onSubmit={handleSubmit(registerCompany)} className={styles.form}>
                <div>
                    <Input 
                        id="companyName" 
                        type="text" 
                        name="companyName" 
                        placeholder="Название АЭК" 
                        register={register}
                    />
                </div>
                {/* <label htmlFor="companyName">
                    <input type="text" name="companyName" id="companyName" onChange={inputChange} required/>
                    <span>Назание АЭК</span>
                </label> */}
                <input className="submit" type="submit" value="Далее"/>
            </form>}
            {isCompanyExist && 
            <form onSubmit={handleSubmit(joinCompany)} className={styles.form}>
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
