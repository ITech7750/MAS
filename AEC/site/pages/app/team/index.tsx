import React, {useRef, useEffect} from 'react'
import Wrapper from '../../../components/Wrapper'
import Grid from '../../../components/grid'
import Panel from '../../../components/Panel'
import Select from 'react-select'
import styles from "../../../styles/team.module.scss"
import router from 'next/router'
import toast from 'react-hot-toast'
import { checkToken } from '../../../libs/token'

export default function Index() {
    console.log(styles)
    let selector = useRef({value: ''}) //КОСТЫЛЬ ЗДЕСЬ
    let usages = useRef({value: ''}) //И здесь
    useEffect(() => {
        checkToken()
    }, [])
    // async function submit(){
    //     let select, count;
    //     if(selector.current){
    //         select = selector.current.value;
    //     }
    //     else return
        
    //     if(selector.current)
    //         count = usages.current.value
    //     else return
        
    //     if(count <= 0){
    //         toast("Введите количество большее нуля")
    //         return
    //     }
    //     try{
    //         const res = await fetch('https://testpythonaenet.herokuapp.com/company/add', {
    //             body: JSON.stringify({
    //                 token: localStorage.getItem('token'),
    //                 role: select,
    //                 usages: count 
    //             }),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             method: 'POST',
    //         })
    //         const result = await res.json()
    //         console.log(result);
    //         /*result.inviteLink.select()
    //         document.execCommand("copy")*/
    //         toast("Ссылка скопирована в буфер обмена")
    //     } catch(e){
    //     console.log(e);      
    //     }
    // }

    return (
        <div >
            <Wrapper name={"Управление командой"}>
                {/* <Grid width={16} height={12} gap={"0px"}>
                    <Panel width={7} className={styles.search}>
                        <input type="text" placeholder="Поиск по почте или имени"/>
                    </Panel>
                    <Panel width={5} className={styles.select}> */}
                        {/* <Select onInputChange={(event) => {
                            console.log(event);
                        }} styles={
                            {
                                indicatorContainer: (provided, state) => (
                                    {
                                        ...provided,
                                        height: "10px"
                                    }
                                )
                            }
                        } className={styles.options} 
                          defaultValue={{value: "someone", label: "Гость"}} 
                          options={[
                            { value : 'someone', label: "Гость"},
                            { value : 'director', label: "Руководитель"},
                            { value : 'economy', label: "Экономист"},
                            { value : 'prog', label: "Программист"},
                        ]}
                          ref={selector}></Select> */}
                          {/* <select name="selector" id="selector" ref={selector}>
                            <option value="someone">Гость</option>
                            <option value="director">Руководитель</option>
                            <option value="economy">Экономист</option>
                            <option value="prog">Программист</option>
                          </select> */}
                        {/* } className={styles.options} defaultValue={{value: "someone", label: "Гость"}} options={[
                            { value : 'someone',  label: "Гость"        },
                            { value : 'director', label: "Руководитель" },
                            { value : 'economy',  label: "Экономист"    },
                            { value : 'prog',     label: "Программист"  },
                        ]}></Select> */}
                    {/* </Panel>
                    <Panel className={styles.count} width={2}>
                        <input type="number" placeholder="Длительность" ref={usages}/>
                    </Panel>
                    <Panel className={styles.generate} width={2}>
                        <button onClick={submit}>Сгенерировать</button>
                    </Panel>
                </Grid>*/ }
            </Wrapper>
        </div>
    )
}
