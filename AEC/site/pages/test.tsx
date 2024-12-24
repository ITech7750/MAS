import router from 'next/router';
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast';
import { checkToken } from '../libs/token';
import styles from "../styles/components/modefullauto.module.scss"

export default function ModeFullAuto() {
    
    useEffect(() => {
        checkToken();
        let cleanupFunction = false;
        async function fetchAPI(){
            try{
                const res = await fetch('https://testpythonaenet.herokuapp.com/contract/list', {
                    body: JSON.stringify({
                        token: localStorage.getItem('token')
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                })
                const result = await res.json()
                console.log(result);
            } catch(e){
                console.log(e);
            }
        }
        fetchAPI()
        return () => {cleanupFunction = true};
    }, [])
    return (
        <div>
        
        </div>
    )
}
