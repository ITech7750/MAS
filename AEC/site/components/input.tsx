import React, { useState, useEffect } from 'react'
import styles from '../styles/reg.module.scss'

export default function Input({id, name, type, register, placeholder,  ...otherProps}) {
    const [isEmpty, setIsEmpty] = useState('true');
    const [value, setValue] = useState('true');
    function inputChange(e){
        e.preventDefault();
        if(e.target.value!= ""){
            //e.target.parentNode.classList.add("labelNotEmpty");
            //e.target.parentNode.isEmpty = false;
            //e.target.parentNode.props.p = "labelNotEmpty";
            setIsEmpty('false');
        }
          else 
            //e.target.parentNode.classList.remove("labelNotEmpty");
            setIsEmpty('true');
        //setValue(e.target.value)
    }   

    return (
        <label htmlFor={id} className={styles.label}>
            <input {...register(name)} type={type} name={name} id={id} onChange={(e) => {
                inputChange(e);
            }} {...otherProps}/><br/>
            <span
                style = {isEmpty == 'false' ? {
                    transform: "scale(.8) translateY(-120%)",
                    color: "#08a",
                    transformOrigin: "top left",
                } : {
                    
            }}>{placeholder}</span>
        </label>
    )
}
