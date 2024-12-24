import React, { useEffect, useContext, useState } from 'react';
import styles from '../styles/app.module.scss';
import { MainContext } from "../context/MainContext";
import { useRouter } from 'next/router';

export default function Wrapper(props) {
    const context = useContext(MainContext);
    const [user, setUser] = useState(null); // Если user === null, значит пользователь не авторизован
    const [isAuthorized, setIsAuthorized] = useState(false); // Состояние авторизации
    const router = useRouter();

    useEffect(() => {
        // Проверка токена и данных пользователя
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (token && userData) {
            // Если токен и данные пользователя существуют
            setUser(JSON.parse(userData));
            setIsAuthorized(true);
        } else {
            // Пользователь не авторизован
            setUser(null);
            setIsAuthorized(false);
        }
    }, []);

    const route = router.asPath.slice(5); // Получение текущего маршрута

    return (
        <div className={styles.wrapper}>
            <aside>
                <header>
                    <div className={styles.name}>
                        <h2>AENet</h2>
                    </div>
                    <div className={styles.search}>
                        <button><i className="fas fa-search"></i></button>
                        <input type="text" placeholder='Поиск по функциям' />
                    </div>
                    <a href="">
                        <i className="fas fa-home-lg-alt"></i><h6>Домашняя страница</h6>
                    </a>
                    <a href="">
                        <i className="fas fa-bell"></i><h6>Уведомления</h6>
                    </a>
                    <a href="">
                        <i className="fas fa-arrow-down"></i><h6>Другое...</h6>
                    </a>
                </header>
                <h6>{props.section1}</h6>
                <section>
                    {props.links1}
                </section>
                <h6>{props.section2}</h6>
                <section>
                    {props.links2}
                </section>
                <h6>{props.section3}</h6>
                <section>
                    {props.links3}
                </section>
            </aside>
            <main>
                <header>
                    <div className={styles.user}>
                        {/* Если пользователь авторизован, показываем данные */}
                        {isAuthorized && user ? (
                            <div>
                                <div
                                    className={styles.picture}
                                    style={{
                                        background: "linear-gradient(45deg," +
                                            (user.type === "economy" ? "#fd0,#f80" :
                                                (user.type === "prog" ? "#0df,#04f" :
                                                    (user.type === "director" ? "#f46,#f84" :
                                                        (user.type === "manager" ? "#0f4,#0fd" : "#888, #666"))))
                                            + ")"
                                    }}
                                >
                                    {context.user.imageURL !== "" ?
                                        <img src={context.user.imageURL} alt="User Image" /> :
                                        <div className={styles.placeholder}><i className="fas fa-user"></i></div>
                                    }
                                </div>
                                <div className="info">
                                    <h5>{user.name + " " + user.surname}</h5>
                                    <h6>{user.role}</h6>
                                </div>
                            </div>
                        ) : (
                            // Если пользователь не авторизован, показываем сообщение
                            <div>
                                <div className={styles.placeholder}>
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="info">
                                    <h5>Гость</h5>
                                    <h6>Вы не авторизованы</h6>
                                </div>
                            </div>
                        )}
                        <div className={styles.scroller}>
                            {isAuthorized && user ? (
                                <>
                                    {(user.type !== "someone" && user.type !== "prog") &&
                                        <a href="statistics" className={route === "statistics" ? styles.selected : null}>
                                            <i className="fas fa-chart-line"></i>
                                            <span>Статистика</span>
                                        </a>
                                    }
                                    <a href="contracts" className={route === "contracts" ? styles.selected : null}>
                                        <i className="fas fa-file-contract"></i>
                                        <span>Контракты</span>
                                    </a>
                                    {user.type !== "someone" &&
                                        <a href="requests" className={route === "requests" ? styles.selected : null}>
                                            <i className="fas fa-file-invoice"></i>
                                            <span>Запросы</span>
                                        </a>
                                    }
                                    {(user.type !== "someone" && user.type !== "economy" && user.type !== "manager") &&
                                        <a href="api" className={route === "api" ? styles.selected : null}>
                                            <i className="fas fa-code"></i>
                                            <span>API</span>
                                        </a>
                                    }
                                    <a href="team" className={route === "team" ? styles.selected : null}>
                                        <i className="fas fa-users-cog"></i>
                                        <span>Команда</span>
                                    </a>
                                    <a href="aec" className={route === "aec" ? styles.selected : null}>
                                        <i className="fas fa-chart-network"></i>
                                        <span>Обзор</span>
                                    </a>
                                </>
                            ) : (
                                // Неавторизованные пользователи видят ограниченный набор ссылок
                                <>
                                    <a href="requests" className={route === "requests" ? styles.selected : null}>
                                        <i className="fas fa-file-invoice"></i>
                                        <span>Запросы</span>
                                    </a>
                                    <a href="team" className={route === "team" ? styles.selected : null}>
                                        <i className="fas fa-users-cog"></i>
                                        <span>Команда</span>
                                    </a>
                                </>
                            )}
                        </div>
                    </div>
                </header>
                <main className={styles.innerWrapper}>
                    <div className={styles.gridHeader}>
                        <h4>{props.name}</h4>
                    </div>
                    <div className={styles.content}>{props.children}</div>
                </main>
            </main>
        </div>
    );
}
