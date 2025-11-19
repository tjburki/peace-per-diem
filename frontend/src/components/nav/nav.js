import React from 'react';
import { useAuth0 } from '../../auth/auth0';
import { Link } from 'react-router-dom';
import Loading from '../loading/loading';
import styles from './nav.module.scss';

const Nav = () => {
    const { isAuthenticated, user, loading } = useAuth0();

    return (
        <div className={styles.nav}>
            {
                loading 
                    ?   <Loading />
                    :   isAuthenticated
                        ?   <Link 
                                className={styles.profilelink} 
                                to='/profile'
                            >
                                <img src={user.picture} style={{maxHeight: '1rem'}} /> {user.name}
                            </Link>
                        :   <Link 
                                to='/login'
                            >
                                login
                            </Link>
            }
        </div>
    );
}

export default Nav;