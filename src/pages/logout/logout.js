//Packages
import React from 'react';

//Helpers
import { useAuth0 } from '../../auth/auth0';

//Components
import { LargeText } from '../../components/layout/text/text';
import Loading from '../../components/loading/loading';

const Logout = () => {
    useAuth0().logout();

    return (
        <LargeText>
            <div>
                <Loading /> Logging out...
            </div>
        </LargeText>
    );
};

export default Logout;