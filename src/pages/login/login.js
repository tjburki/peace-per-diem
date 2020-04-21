//Packages
import React from 'react';

//Helpers
import { useAuth0 } from '../../auth/auth0';

//Components
import { LargeText } from '../../components/layout/text/text';
import Loading from '../../components/loading/loading';

const Login = () => {
    useAuth0().loginWithRedirect({
        connection: 'google-oauth2'
    });

    return (
        <LargeText>
            <div>
                <Loading text='Logging in...' />
            </div>
        </LargeText>
    );
};

export default Login;