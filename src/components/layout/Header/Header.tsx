import React from 'react';
import { Link } from 'react-router';
import styles from './Header.module.scss';


const HEADER_LIST = [
    { label: "Dashboard", link: "/" },
    { label: "Convert", link: "/convert/btc/usdt" },
    { label: "Price", link: "/price/bitcoin" }


]

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/" className={styles.logoLink}>
                    <img src="/src/assets/png/binanceLogo.png" alt="Binance Logo" className={styles.logoImage} />
                </Link>
            </div>
            <nav>
                <ul className={styles.navList}>
                    {HEADER_LIST.map((item) => <li key={item.link} >
                        <Link to={item.link} className={styles.navLink}>
                            {item.label}
                        </Link>
                    </li>)}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
