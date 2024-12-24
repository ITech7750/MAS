import React, {useContext, useEffect, useState} from 'react'
import ModeSelect from '../../../components/modeSelect'
import Wrapper from '../../../components/Wrapper'
import { MainContext } from '../../../context/MainContext'
import { checkToken } from '../../../libs/token'
import CompanyReg from '../../registration/company'
import ModeFullAuto from '../../../components/modeFullAuto'
import ModeSemiAuto from '../../../components/modeSemiAuto'
import ModeManual from '../../../components/modeManual'
import router from 'next/router'

export default function Index() {
    const context = useContext(MainContext);
    const [mode, setMode] = useState(0);

    useEffect(() => {
        setMode(parseInt(localStorage.getItem("company-mode")));
        checkToken();
        let cleanupFunction = false;
        async function fetchAPI(){
            try{
                const res = await fetch('http://127.0.0.1:5000/userInfo', {
                    body: JSON.stringify({
                        token: localStorage.getItem('token'),
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                })
                const result = await res.json();
                if(!cleanupFunction){
                    if(result.status_code == 1){
                        setMode(result.company_mode)
                        localStorage.setItem('company-mode', result.company_type)
                    }
                    else{
                        localStorage.setItem('token', '')
                        //router.push('/app/requests')
                    }
                }
            } catch(e){
                console.log(e);
            }
        }
        fetchAPI()
        return () => {cleanupFunction = true};
    }, [])
    return (
        <div>
            <Wrapper name={
                mode == 0 && "Настройка запроса" || mode == 1 && "Автоматический режим" || mode == 2 && "Полуавтоматический режим" || mode == 3 && "Ручной режим"
            }>
                {mode === 0 ? <ModeSelect/>: null}
                {mode === 1 ? <ModeFullAuto/> : null}
                {mode === 2 ? <ModeSemiAuto /> : null}
                {mode === 3 ? <ModeManual /> : null}
            </Wrapper>
        </div>
    )
}
