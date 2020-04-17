import React from 'react';
import { useAuth0 } from '../../react-auth0-spa';
import { Link } from 'react-router-dom';
import { appUrl } from '../../constants';
import Loading from '../loading/loading';
import styles from './nav.module.scss';

const Nav = () => {
    const { isAuthenticated, loginWithRedirect, user, loading } = useAuth0();

    return (
        <div>
            {
                loading 
                    ?   <Loading />
                    :   isAuthenticated
                        ?   <Link 
                                className={styles.profilelink} 
                                to="/profile"
                            >
                                <img src={user.picture} style={{maxHeight: '1rem'}} /> {user.name}
                            </Link>
                        :   <Link 
                                onClick={
                                    () => loginWithRedirect({
                                        redirect_uri: `${appUrl}/profile`, 
                                        connection: 'google-oauth2'
                                    })
                                }
                            >
                                login
                            </Link>
            }
        </div>
    );
}

export default Nav;