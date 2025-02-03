import styles from './convertPageHeader.module.scss'

const ConvertPageHeader = () => {

    return <div className={styles.pageHeaderWrapper}>
        <h2 className={styles.mainHeader}>Binance Convert</h2>
        <h4 className={styles.subHeader}>
            Instant Price | Guaranteed Price | Any Pair
        </h4>
    </div>

}

export default ConvertPageHeader