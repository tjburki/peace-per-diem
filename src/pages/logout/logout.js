//Packages
import React from 'react';

//Helpers
import { useAuth0 } from '../../auth/auth0';

//Components
import { GiganticText } from '../../components/layout/text/text';
import Loading from '../../components/loading/loading';

const Logout = () => {
    useAuth0().logout();

    return (
        <GiganticText><div><Loading /> Logging out...</div></GiganticText>
    );
};

export default Logout;