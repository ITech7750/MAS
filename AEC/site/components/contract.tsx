import React from 'react'
import styles from '../styles/components/contracts.module.scss'

export default function Contracts({data}) {
    return (
        <div className={styles.container}>
            <h5 className={styles.center}>Контракт с {data.companies[0].company_name}</h5>
            <div className={styles.grid}>
                <div>
                    <h6 className={styles.heading}>Энергия</h6>
                    <p>Предоставляется от {data.minEnergy} до {data.maxEnergy} МВт</p>
                    <p>Суммарно потреблено {data.sumEnergy} МВт</p>
                </div>
                <div>
                    <h6 className={styles.heading}>Цена</h6>
                    <p>За один МВт/час - {data.priceForEnergy} руб.</p>
                    <p>Суммарно выплачено {data.priceSum} руб.</p>
                </div>
                <div>
                    <h6 className={styles.heading}>Даты</h6>
                    <p>Заключен на срок с {data.startDate} по {data.endDate}</p>
                    <p>На данный момент {data.isEnded ? 'не' : ''} выполняется</p>
                </div>
            </div>
        </div>
    )
}
