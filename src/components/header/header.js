import React from 'react';
import styles from './header.module.scss';

const Header = () =>
    <div className={styles.header}>
        <div className={styles.applayout}>
            <div className={styles.title}>
                <i className={`fa fa-dove ${styles.logo}`}></i>
                <div>
                    <div>peace per diem</div>
                    <div className={styles.smalltext}>once a day positive meditations</div>
                </div>
            </div>
            <div className={`${styles.menu} ${styles.smalltext}`}>
                login
            </div>
        </div>
    </div>;

export default Header;