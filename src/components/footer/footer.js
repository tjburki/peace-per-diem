import React from 'react';
import styles from './footer.module.scss';

const Footer = () => 
    <div className={styles.footer}>
        <div className={styles.appcontainer}>
            &copy; {new Date().getFullYear()} Tyler Burki
        </div>
    </div>;

export default Footer;