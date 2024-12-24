import React from 'react'
import styles from "../styles/components/grid.module.scss"

export default function Grid(props) {
    return (
        <div style={{
            display: "grid",
            gap: props.gap ? props.gap : "8px",
            gridTemplateColumns: `repeat(${props.width ? props.width : 12}, 1fr)`,
            gridTemplateRows: `repeat(${props.height ? props.height : 12}, 1fr)`,
            ...props.style,
        }} className={styles.grid + " " + props.className}>
            {props.children}
        </div>
    )
}
