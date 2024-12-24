import router from 'next/router';
export function checkToken(a = 'login'){
    if(!localStorage.getItem('token')){
        if(a == 'login') 
            router.push('/login')
        else 
            router.push('/registration')
    }
    
}