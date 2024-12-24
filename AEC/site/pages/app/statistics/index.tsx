import React, {useContext} from 'react'
import Wrapper from '../../../components/Wrapper'
import Panel from '../../../components/Panel'
import {MainContext} from '../../../context/MainContext'

export default function Index() {
    const context = useContext(MainContext);
    return (
        <Wrapper name={"Статистика по проекту"}>
            
        </Wrapper>
    )
}