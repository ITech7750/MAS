import { useState, useEffect, useRef, FormEvent } from 'react';
import styles from '../../styles/reg.module.scss'

function Profile() {
    const loginForm = useRef(null);
    const [userLogin, setUserLogin] = useState('');
    const [password, setPassword] = useState('');

    const func = async event => {
        if (typeof window !== "undefined") {
            let token = localStorage.getItem("token");
            console.log(token);
            if(token){
                let body = JSON.stringify({
                    token: token
                });

                const res = await fetch('https://testpythonaenet.herokuapp.com/pac', {
                    body: body,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    method: 'POST'
                });
                const result = await res.json()
                console.log(result);
            }
        }
    }
    
    return (
        <div className={styles.wrapper}>
            {console.log('START')}
            <button onClick={func}>FUNCTION</button>
        </div>
    );
}

export default Profile;
