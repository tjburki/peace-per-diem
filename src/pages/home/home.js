import React, { useEffect, useState } from 'react';
import PeaceList from '../../components/peace-list/peace-list';
import { getPeaces } from '../../resources/peaces';
import Loading from '../../components/loading/loading';
import { GiganticText } from '../../components/layout/text/text';
import { useAuth0 } from '../../react-auth0-spa';

const Home = () => {
    const [data, setData] = useState({peaces: [], loading: true});
    const { user } = useAuth0();

    useEffect(() => {
        async function getData() {
            const peaces = await getPeaces(user ? user.user_id : null);
            setData({peaces, loading: false});
        }

        getData();
    }, []);

    const { loading, peaces } = data;

    return loading ? <GiganticText><Loading /></GiganticText> : <PeaceList peaces={peaces} />;
};

export default Home;