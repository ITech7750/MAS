import React, {useState} from 'react'
import styles from "../styles/components/modefullauto.module.scss"
import Grid from './grid';
import Panel from './Panel';

export default function ModeFullAuto() {
    const [agentStage, setAgentStage] = useState(0);
    const panel = {borderRadius: '12px', background: "#fff"};

    //#region 
    async function saveEnergyProps(){
        try{
            const res = await fetch('https://testpythonaenet.herokuapp.com/saveEnergyProps', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'),
                    energy: {
                        max: 1.5,
                        min: 1.5,
                        price: 1.5,
                        month: 1.5
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
        } catch(e){
            console.log(e);
        }
    }
    async function sendEnergyProps(){
        try{
            const res = await fetch('https://testpythonaenet.herokuapp.com/sendEnergyProps', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'), //just copy+past from saveEnergyProps to sendEnergyProps and isReady = false
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
        } catch(e){
            console.log(e);
        }
    }
    async function ready(){
        try{
            const res = await fetch('https://testpythonaenet.herokuapp.com/energyMPready', {
                body: JSON.stringify({
                    token: localStorage.getItem('token'), //just write in company 'isReady = true'
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
        } catch(e){
            console.log(e);
        }
    }
    
    //#endregion
    
    return (
        <div style={{height: "100%"}}>
            <Grid width={12} height={12} style={{height: "100%"}}>
                <Panel width={10} height={3} className={styles.mainPanel}>
                    <p><div>{localStorage.getItem("company-type") == "1" ? "Минимальное кол-во энергии (МВт)" : "Производимая энергия (МВт)"}</div><input type="number" /></p>
                    <p><div>Максимальное кол-во энергии (МВт)</div><input type="number" /></p>
                    <p><div>Цена за МВт энергии в рублях</div><input type="number" /></p>
                    <p><div>Время контракта (месяц)</div><input type="number" /></p>
                </Panel>
                <Panel width={2}  height={1} className={styles.button + " " + styles.first}><h5>Save</h5><i className="fas fa-address-card"></i></Panel>
                <Panel width={2}  height={1} className={styles.button + " " + (agentStage < 1 ? styles.locked : null)}><h5>Activate</h5><i className="fas fa-share-alt"></i></Panel>
                <Panel width={2}  height={1} className={styles.button + " " + styles.last + " " + (agentStage < 2 ? styles.locked : null)}><h5>Ready</h5><i className="fas fa-play"></i></Panel>
                <Panel width={12} height={9} style={panel} class={styles.agentPanel}>
                    <Agent number={"Вы"} time={2} type={1} min={3} max={5} price={3200} main/>
                    <Agent number={"ВNS-SHOP"} time={2.5} type={1} min={5} max={7} price={3300}/>
                    <Agent number={"ГК «Росатом»"} time={3} type={2} min={8} max={11} price={3550}/>
                    <Agent number={"ПАО «Т Плюс»"} time={2.5} type={2} min={1} max={2} price={3110}/>
                    <Agent number={"ООО «Сибирикс»"} time={1} type={2} min={5} max={6} price={3320}/>

                </Panel>

            </Grid>
        </div>
    )
}


function Agent(props){
    return <div className={styles.agent + " " + (props.main ? styles.main : null)}>
        {props.type == 1 && <i className="fas fa-lightbulb"></i>}
        {props.type == 2 && <i className="fas fa-plug"></i>}
        <div className={styles.number}>{props.number}</div>
        <div className={styles.time}>{props.time} мес.</div>
        <div className={styles.energy}>
            <div className={styles.min}>{props.min} МВт</div>
            <div className={styles.max}>{props.max} МВт</div>
        </div>
        <div className={styles.price}>{props.price} руб. / МВт</div>

    </div>
}