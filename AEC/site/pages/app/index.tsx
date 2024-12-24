import router from 'next/router';
import React from 'react'
import { useEffect } from "react";

export default function App() {
    
    useEffect(() => {
        async function fetchAPI(){
            try{
                const res = await fetch('https://testpythonaenet.herokuapp.com/userInfo', {
                    body: JSON.stringify({
                        token: localStorage.getItem('token')
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                });
                console.log("Fetched");
                const result = await res.json();
                if(result.status_code == -1){
                    console.log('token not found');
                    localStorage.setItem('token', '');
                    router.push('/login');
                }
                else if(result.status_code == 1){
                    var user = {
                        name: result.name,
                        surname: result.surname,
                        patronymic: result.patronymic,
                        email: result.email,
                        role: result.role,
                        type: result.type
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("company-mode", result.company_mode);
                    localStorage.setItem("company-type", result.company_type);
                    router.push('/app/requests');
                }
                console.log(result);
            }
            catch(e){
                console.log(e);
                //router.push('/login')
            }
        }
        fetchAPI();
    }, [])
    
    return (
        <div>
            
        </div>
    )
}
