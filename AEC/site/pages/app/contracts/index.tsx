import React, { useEffect, useState } from 'react'
import Wrapper from '../../../components/Wrapper'
import Contracts from '../../../components/contract'
import Tagline from '../../../components/tagline'
import { data } from '../../../context/MainContext'
import { checkToken } from '../../../libs/token'
export default function Index() {
    const [contracts, setContracts] = useState([]);
    /*const contracts = [{
        name: 'ОАО "Газпром"',
        minEnergy: 24,
        maxEnergy: 32,
        sumEnergy: 342,
        priceForEnergy: 3000,
        priceSum: 3680000,
        startDate: "12.02.2021",
        endDate: "12.02.2022",
        isEnded: false,
        isRejected: false,
    }, {
            name: 'ПАО "Россети"',
            minEnergy: 12,
            maxEnergy: 16,
            sumEnergy: 170,
            priceForEnergy: 2000,
            priceSum: 6680000,
            startDate: "16.07.2021",
            endDate: "16.07.2023",
            isEnded: true,
            isRejected: true,
        }]*/
    useEffect(() => {
        async function fetchAPI(){
            try{
                checkToken()
                const res = await fetch('https://testpythonaenet.herokuapp.com/contract/list', {
                    body: JSON.stringify({
                        token: localStorage.getItem('token')
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                })
                const result = await res.json();
                // const result = {
                //     status_code: 1,
                //     contracts: [{
                //         name: 'ОАО "Газпром"',
                //         minEnergy: 24,
                //         maxEnergy: 32,
                //         sumEnergy: 342,
                //         priceForEnergy: 3000,
                //         priceSum: 3680000,
                //         startDate: "12.02.2021",
                //         endDate: "12.02.2022",
                //         isEnded: false,
                //         isRejected: false,
                //     }, {
                //             name: 'ПАО "Россети"',
                //             minEnergy: 12,
                //             maxEnergy: 16,
                //             sumEnergy: 170,
                //             priceForEnergy: 2000,
                //             priceSum: 6680000,
                //             startDate: "16.07.2021",
                //             endDate: "16.07.2023",
                //             isEnded: true,
                //             isRejected: true,
                //         }]
                // }
                console.log(result);
                
                if(result.status_code == 1){
                    setContracts(result.contracts)
                    console.log(contracts);
                }
            } catch(e){
                console.log(e);
                
            }
        }
        fetchAPI()
    }, [])
    return (
        <div>
            <Wrapper name="Статистика заключенных контрактов">
                <Tagline>Текущие контракты</Tagline>
                {contracts && contracts.filter(x => !x.isEnded && !x.isRejected).map((x) => (
                    <Contracts data={x} key={data.name} />
                ))}
                <Tagline>Отклоненные контракты</Tagline>
                {contracts && contracts.filter(x => x.isEnded && x.isRejected).map((x) => (
                    <Contracts data={x} key={data.name} />
                ))}
                <Tagline>Завершенные контракты</Tagline>
                {contracts && contracts.filter(x => x.isEnded && !x.isRejected).map((x) => (
                    <Contracts data={x} key={data.name} />
                ))}
            </Wrapper>
        </div>
    )
}
