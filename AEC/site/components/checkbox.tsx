import React, {useState} from 'react'
import styles from '../styles/components/checkbox.module.scss';

export default function Checkbox() {
    const [checked, setChecked] = useState(false);
    const handleClick = (event) => {
        setChecked(!checked);
    }
    return (
        <div className={styles.checkbox + " " + (checked ? styles.checked : NaN)} onClick={handleClick}>
            
        </div>
    )
}
