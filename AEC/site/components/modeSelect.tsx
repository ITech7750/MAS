import router from 'next/router';
import React, {useState, useContext, useEffect  } from 'react'
import { MainContext } from '../context/MainContext';
import { checkToken } from '../libs/token';
import styles from "../styles/components/modeselect.module.scss"
import Tagline from './tagline'

export default function ModeSelect() {
    const context = useContext(MainContext)
    const [info, setInfo] = useState(0);
    const [mode, setMode] = useState(0);
    const [type, setType] = useState(0);
    const [selectedType, setSelectedType] = useState(0);
    const openInfo = (event) => {
        event.preventDefault();
    } 

    async function fetchAPItype(){
        try{
            const res = await fetch('https://testpythonaenet.herokuapp.com/requestType', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    type: localStorage.getItem('company-type')
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
            const result = await res.json();
            if(result.status_code == 1)
                router.reload();
            if(result.status_code == -1){
                localStorage.setItem('token', '');
                router.push('/login')
            }
        } catch(e){
            console.log(e);
        }
    }

    async function fetchAPImode(){
        try{
            const res = await fetch('https://testpythonaenet.herokuapp.com/requestMode', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    mode: localStorage.getItem('company-mode')
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
            const result = await res.json();
            if(result.status_code == 1){
                router.reload()
                return
            }
            if(result.status_code == -1){
                localStorage.setItem('token', '');
                router.push('/login')
            }
        } catch(e){
            console.log(e)
            router.reload()
        }
    }
    useEffect(() => {
        setType(parseInt(window.localStorage.getItem("company-type")));
        checkToken();
        let cleanupFunction = false;
        async function fetchAPI(){
            try{
                const res = await fetch('https://testpythonaenet.herokuapp.com/userInfo', {
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
                        setType(result.company_type);
                        localStorage.setItem('company-type', result.company_type)
                    }
                    else{
                        console.log('error (/userInfo.status_code != 1');
                        
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
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column"
        }}>
            { type == 0 && 
                <><form action="" className={styles.typeselector}>
                    <Type name="Потребитель"                     selected={selectedType === 1} func={() => {setSelectedType(1); localStorage.setItem("company-type", "1")}} description="Вы планируете совершать покупку энергии"                   icon="industry-alt" >     </Type>
                    <Type name="Стабильный генератор"            selected={selectedType === 2} func={() => {setSelectedType(2); localStorage.setItem("company-type", "2")}} description="Вы планируете продавать стабильную энергию"                icon="analytics" >        </Type>
                    <Type name="ВИЭ генератор"                   selected={selectedType === 3} func={() => {setSelectedType(3); localStorage.setItem("company-type", "3")}} description="Вы планируете продавать стохастическую энергию"            icon="solar-panel" >      </Type>
                    <Type name="Шеренговая станция"       locked selected={selectedType === 4} func={() => {setSelectedType(4); localStorage.setItem("company-type", "4")}} description="Вы заряжаете электротранспорт"                             icon="charging-station" > </Type>
                    <Type name="Система теплоснабжения"   locked selected={selectedType === 5} func={() => {setSelectedType(5); localStorage.setItem("company-type", "5")}} description="Вы осуществляете теплоснабжение объектов"                  icon="fire" >             </Type>
                    <Type name="Аккумуляторы и инверторы" locked selected={selectedType === 6} func={() => {setSelectedType(6); localStorage.setItem("company-type", "6")}} description="Вы предоставляете оборудование для преобразования энергии" icon="car-battery" >      </Type>
                    {/* <button onClick={(event) => {
                        event.preventDefault();
                        context.company.type = 2;
                        setType(2);
                        window.localStorage.setItem("company-type", "2");
                        fetchAPItype()
                    }}>
                        <h5>Генератор</h5>
                        <i className="fas fa-solar-panel"></i>
                        <p>Вы планируете продавать энергию</p>
                    </button>
                    <button onClick={(event) => {
                        event.preventDefault();
                        context.company.type = 3
                        setType(3);
                        window.localStorage.setItem("company-type", "3");
                        fetchAPItype();
                    }} disabled>
                        <h5>Шеринг</h5>
                        <i className="fas fa-charging-station"></i>
                        <p>Вы планируете заряжать машины</p>
                    </button>
                    <button onClick={(event) => {
                        event.preventDefault();
                        context.company.type = 4
                        setType(4);
                        window.localStorage.setItem("company-type", "4");
                        fetchAPItype();
                    }} disabled>
                        <h5>Аккумулятор</h5>
                        <i className="fas fa-car-battery"></i>
                        <p>Вы планируете продавать гибкость</p>
                    </button> */}
                </form>
                {selectedType!=0 && <div className={styles.info}>
                    <h5>
                        {selectedType===1 && "Потребитель"}
                        {selectedType===2 && "Стабильный генератор"}
                        {selectedType===3 && "Маневренный генератор"}
                    </h5>
                        {selectedType===1 && <p>Данная категория пользователей предназначена для тех, кто планирует покупать энергию для своих производственных предприятий или других объектов бизнеса</p>}
                        {selectedType===2 && <p>Данная категория пользователей предназначена для тех, кто планирует постоянно генерировать энергию с фиксированной стабильностью, предоставляя энергию на постоянной основе</p>}
                        {selectedType===3 && <p>Данная категория пользователей предназначена для тех, кто планирует постоянно генерировать энергию с стохастическими колебаниями в мощностями, которые будут динамически распределяться в АЭК</p>}
                </div>}
                <button className={styles.nextbutton} disabled={selectedType===0} onClick={(event) => {
                    event.preventDefault();
                    fetchAPItype();
                }}>
                    Далее <i className="fas fa-arrow-right"></i>
                </button>
                </>
            }
            {info === 0 && type != 0 && mode == 0 && <form action="" className={styles.form}>
                <Tagline className={styles.heading} background={"#fff"} color={"#555"} bold={true}>Выберите режим работы</Tagline>
                <div className={styles.modes}>
                    <div className={styles.mode}>
                        <i className={styles.icon + " fas fa-robot"}></i>
                        <span>Автоматический</span>
                        <button onClick={(event) => {
                            event.preventDefault();
                            context.company.mode = 1;
                            setMode(1);
                            window.localStorage.setItem("company-mode", "1");
                            fetchAPImode();
                        }}><i className={styles.next + " fas fa-arrow-right"}></i></button>
                        <button onClick={(event) => {
                            event.preventDefault(); setInfo(1);
                        }}><i className={styles.info + " fas fa-question"}></i></button>
                    </div>
                    <div className={styles.mode}>
                        <i className={styles.icon + " fas fa-laptop-code"}></i>
                        <span>Полуавтоматический</span>
                        <button onClick={(event) => {
                            event.preventDefault();
                            context.company.mode = 2;
                            setMode(2);
                            window.localStorage.setItem("company-mode", "2");
                            fetchAPImode();
                        }}><i className={styles.next + " fas fa-arrow-right"}></i></button>
                        <button onClick={(event) => {
                            event.preventDefault(); setInfo(2);
                        }}><i className={styles.info + " fas fa-question"}></i></button>
                    </div>
                    <div className={styles.mode}>
                        <i className={styles.icon + " fas fa-user-chart"}></i>
                        <span>Ручной</span>
                        <button onClick={(event) => {
                            event.preventDefault();
                            context.company.mode = 3;
                            setMode(3);
                            window.localStorage.setItem("company-mode", "3");
                            fetchAPImode();
                        }}><i className={styles.next + " fas fa-arrow-right"}></i></button>
                        <button onClick={(event) => {
                            event.preventDefault(); setInfo(3);
                        }}><i className={styles.info + " fas fa-question"}></i></button>
                    </div>
                </div>
            </form>}
            {info === 1 && type != 0 && <form className={styles.form}>
                <Tagline className={styles.heading} background={"#fff"} color={"#555"} bold={true}>Автоматический режим</Tagline>
                <p>Данный режим работы подразумевает использование интеллектуальной системы агентов, которые смогут сами заключить контракт.</p>
                <button className={styles.return} onClick={(event) => {
                    event.preventDefault();
                    setInfo(0);
                }}>←</button>
            </form>}
            {info === 2 && type != 0 && <form className={styles.form}>
                <Tagline className={styles.heading} background={"#fff"} color={"#555"} bold={true}>Полуавтоматический режим</Tagline>
                <p>Интеллектуальная система будет оценивать и предлагать вам самые выгодные варианты заключения контрактов, а также систему для связи с {context.company.type == 1 || context.company.type == 3 ? "продавцом" : "покупателем"}.</p>
                <button className={styles.return} onClick={(event) => {
                    event.preventDefault();
                    setInfo(0);
                }}>←</button>
            </form>}
            {info === 3 && type != 0 && <form className={styles.form}>
                <Tagline className={styles.heading} background={"#fff"} color={"#555"} bold={true}>Ручной режим</Tagline>
                <p>В данном режиме мы предоставляем вам возможность полностью вручную выбрать подходящий контракт и напрямую связаться с  {context.company.type == 1 || context.company.type == 3 ? "продавцом" : "покупателем"}.</p>
                <button className={styles.return} onClick={(event) => {
                    event.preventDefault();
                    setInfo(0);
                }}>←</button>
            </form>}
        </div>
    )
}


function Type({func, name, description, icon, locked = false, selected = false, ...properties}){
    return <button onClick={(event) => {
        event.preventDefault();
        if (!locked)
            func();
    }} disabled={locked} className={properties.className + " " + (selected ? styles.selected : '')}>
        <h5>{name}</h5>
        <i className={"fas fa-" + icon}></i>
        <p>{description}</p>
    </button>
}