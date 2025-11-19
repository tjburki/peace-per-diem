import React from 'react';
import Logo from '../logo/logo';
import Nav from '../nav/nav';
import styles from './header.module.scss';

const Header = () =>
    <div className={styles.header}>
        <div className={styles.appcontent}>
            <Logo />
            <Nav />
        </div>
    </div>;

export default Header;