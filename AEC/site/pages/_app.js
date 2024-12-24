import '../styles/globals.scss';
import '../libs/fontawesome/css/all.css';
import {MainContext, data} from '../context/MainContext';


function MyApp({ Component, pageProps }) {
    return <MainContext.Provider value={data}>
        <Component {...pageProps }
        />
    </MainContext.Provider>
}

export default MyApp