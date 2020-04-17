import React from 'react';
import styles from './header.module.scss';
import { useAuth0 } from '../../react-auth0-spa';
import { Link } from 'react-router-dom';
import { appUrl } from '../../constants';

const Header = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <div className={styles.header}>
            <div className={styles.applayout}>
                <Link className={styles.title} to="/">
                    <i className={`fa fa-dove ${styles.logo}`}></i>
                    <div>
                        <div>peace per diem</div>
                        <div className={styles.smalltext}>daily positive meditations</div>
                    </div>
                </Link>
                <div className={styles.nav}>
                    {
                        !isAuthenticated && <Link onClick={() => loginWithRedirect({redirect_uri: `${appUrl}/profile`})}>login</Link>
                    }
                    {
                        isAuthenticated && <Link className={styles.profilelink} to="/profile"><img src={user.picture} style={{maxHeight: '1rem'}} /> {user.name}</Link>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;