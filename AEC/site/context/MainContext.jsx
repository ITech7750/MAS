import React from 'react'

const data = {
    user: {
        id: "",
        name: "Карл",
        surname: "Гаусс",
        patronymic: "Фридрих",
        email: "nazari61@mail.ru",
        password: "87e53d21a99863769a13fab670a464",
        imageURL: "",
        role: "Специалист по магнитным технологиям",
        type: "director", // economy, prog, director, someone
    },
    company: { 
        id: "",
        name: "Гёттингенский университет",
        companyType: "consumer",
        description: "",
        users: [
            ""
        ],
        type: 0,
        logoURL: "",
        mode: 0 //mode of the work (auto, part-auto ...)
    },
    agents: [
        {
            id: ""
        },
        {
            id: ""
        },
    ],
    api: {
        apiKey: "769a13fab670a46487e53d21a99863",
        //some global api settings
    },
    theme: "light",
    system: {
        isContextSave: false,
        redirectPage: '/requests'
    }
}



export const MainContext = React.createContext(data);
export {data}