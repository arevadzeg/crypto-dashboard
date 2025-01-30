import React from 'react';
import { Link } from 'react-router';
import styles from './Header.module.scss';

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
                    <li>
                        <Link to="/dashboard" className={styles.navLink}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/conversion" className={styles.navLink}>
                            Conversion
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
