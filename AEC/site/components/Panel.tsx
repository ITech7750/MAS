import React, {useContext} from 'react'
import { MainContext } from '../context/MainContext'
import styles from '../styles/components/panel.module.scss'

export default function Panel(props) {
    const context = useContext(MainContext)

    return (
        <div className={styles.panel + " " + props.className} onClick={props.onClick} style={{
            gridRow: `span ${props.height} / auto`,
            gridColumn: `span ${props.width} / auto`,
            ...props.style
        }}>
            {props.children}
        </div>
    )
}
