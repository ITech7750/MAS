import router from 'next/router';
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast';
import styles from "../styles/components/modefullauto.module.scss"
import Grid from './grid';
import Panel from './Panel';

export default function ModeFullAuto() {
    const [isSaved, setIsSaved] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const [agentStage, setAgentStage] = useState(parseInt(localStorage.getItem("stage")));
    const [isReady, setIsReady] = useState(false);
    const panel = {borderRadius: '12px', background: "#fff"}
    const [saveEnergyInfo, setSaveEnergyInfo] = useState({
        max: 0,
        min: 0,
        price: 0,
        month: 0
    })
    const [activeEnergyInfo, setActiveEnergyInfo] = useState({
        max: 0,
        min: 0,
        price: 0,
        months: 0
    })
    const [activeMarketPlaceAgents, setActiveMarketPlaceAgents] = useState([])
    

    const [minE, setMinE] = useState(saveEnergyInfo.min)
    const [maxE, setMaxE] = useState(saveEnergyInfo.max)
    const [price, setPrice] = useState(saveEnergyInfo.price)
    const [month, setMonth] = useState(saveEnergyInfo.month)
    //#region 
    async function saveEnergyProps(){  
        if(!(minE && maxE && price && month)){
            toast("Введите все значение")
            console.log("Введите все значение");
            return
        }
        try{
            console.log('saved...');
            
            const res = await fetch('https://testpythonaenet.herokuapp.com/trade/add', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    energy: {
                        max: maxE,
                        min: minE,
                        price: price,
                        months: month
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
            const result = await res.json();
            console.log(result);
            
        } catch(e){
            console.log(e);
        }
        setAgentStage(1);
        localStorage.setItem("stage", "1");
        setIsSaved(true);
    }
    async function sendEnergyProps(){
        try{
            console.log('activate...');
            const res = await fetch('https://testpythonaenet.herokuapp.com/trade/send', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'), //just copy+past from saveEnergyProps to sendEnergyProps and isReady = false
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
            const result = await res.json();
            console.log(result);
        } catch(e){
            console.log(e);
        }
        setAgentStage(2);
        localStorage.setItem("stage", "2");
        setIsSaved(false);
        setIsActive(true);
    }
    async function ready(){
        try{
            const res = await fetch('https://testpythonaenet.herokuapp.com/trade/ready', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'), //just write in company 'isReady = true'
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
            const result = await res.json();
            console.log(result);
        } catch(e){
            console.log(e);
        }
        setAgentStage(0);
        localStorage.setItem("stage", "0");
        setIsActive(false)
        setIsReady(true);
    }
    
    //#endregion
    useEffect(() => {
        let cleanupFunction = false;
        console.log(minE, ' ', maxE, ' ', price, ' ', month);
        console.log(activeEnergyInfo);
        console.log(activeMarketPlaceAgents);
        async function getInfo(){
            console.log('/trade/info');
            
            try{
                const res = await fetch('https://testpythonaenet.herokuapp.com/trade/info', {
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
                if(!cleanupFunction)
                    if(result.status_code == 1){
                        console.log(' | ', result);
                        if(result.save != null){
                            setSaveEnergyInfo(result.save)
                            setMinE(result.save.min)
                            setMaxE(result.save.max)
                            setPrice(result.save.price)
                            setMonth(result.save.months)
                        }
                        if(result.active != null){
                            setActiveEnergyInfo(result.active)
                        }
                        if(result.companies != null){
                            setActiveMarketPlaceAgents(result.companies)
                        }
                    }
                    else{
                        localStorage.setItem('token', '')
                        router.push('/login')
                    }
                
            } catch(e){
                console.log(e);
            }
        }
        getInfo()
        return () => {cleanupFunction = true};
    }, [])
    return (
        
        <div style={{height: "100%"}}>
            {/* {getInfo()} */}
            <Grid width={12} height={12} style={{height: "100%"}}>
                <Panel width={9} height={3} className={styles.mainPanel}>
                    <p>
                        <div>{localStorage.getItem("company-type") == "1" ? "Минимальное кол-во энергии (КВт)" : "Производимая энергия (КВт)"}</div>
                        <input type="number" value={minE} onChange={(e) => {setMinE(parseFloat(e.target.value))}}/>
                    </p>
                    <p><div>Максимальное кол-во энергии (КВт)</div><input type="number" value={maxE} onChange={(e) => {setMaxE(parseFloat(e.target.value))}}/></p>
                    <p><div>Цена за КВт энергии в рублях</div><input type="number" value={price} onChange={(e) => {setPrice(parseFloat(e.target.value))}}/></p>
                    <p><div>Время контракта (месяцев)</div><input type="number" value={month} onChange={(e) => {setMonth(parseFloat(e.target.value))}}/></p>
                </Panel>
                <Panel width={3}  height={1} onClick={saveEnergyProps} className={styles.button + " " + styles.first}><h5>Сохранить</h5><i className="fas fa-address-card"></i></Panel>
                <Panel width={3}  height={1} onClick={isSaved ? sendEnergyProps : null} className={styles.button + " " + (!isSaved ? styles.locked : null)}><h5>Активировать</h5><i className="fas fa-share-alt"></i></Panel>
                <Panel width={3}  height={1} onClick={isActive ? ready: null} className={styles.button + " " + styles.last + " " + (!isActive ? styles.locked : null)}><h5>Запустить</h5><i className="fas fa-play"></i></Panel>
                <Panel width={12} height={9} style={panel} class={styles.agentPanel}>
                    {agentStage==2 && <Agent number={"Вы"} time={activeEnergyInfo.months} type={localStorage.getItem('company-type')} min={activeEnergyInfo.min} max={activeEnergyInfo.max} price={activeEnergyInfo.price} main/>}
                    {/*FOREACH BY */}
                    {/* <Agent number={"ВNS-SHOP"} time={2.5} type={1} min={5} max={7} price={3300}/>
                    <Agent number={"ГК «Росатом»"} time={3} type={2} min={8} max={11} price={3550}/>
                    <Agent number={"ПАО «Т Плюс»"} time={2.5} type={2} min={1} max={2} price={3110}/>
                    <Agent number={"ООО «Сибирикс»"} time={1} type={2} min={5} max={6} price={3320}/> */}
                    {activeMarketPlaceAgents && activeMarketPlaceAgents.map(element => {
                        return <Agent key={element.name} number={element.name} time={element.month} type={element.type} min={element.min} max={element.max} price={element.price}/>
                    })}
                </Panel>

            </Grid>
        </div>
    )
}

function Agent(props){
    return <div className={styles.agent + " " + (props.main ? styles.main : null)}>
        {props.type == 1 && <i className="fas fa-lightbulb"></i>}
        {props.type == 2 && <i className="fas fa-analytics"></i>}
        {props.type == 3 && <i className="fas fa-solar-panel"></i>}
        <div className={styles.number}>{props.number}</div>
        <div className={styles.time}>{props.time} мес.</div>
        <div className={styles.energy}>
            <div className={styles.min}>{props.min}</div>
            <div className={styles.max}>{props.max} КВт</div>
        </div>
        <div className={styles.price}>{props.price} руб. / КВт</div>

    </div>
}