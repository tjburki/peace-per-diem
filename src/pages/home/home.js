import React, { useEffect, useState } from 'react';
import PeaceList from '../../components/peace-list/peace-list';
import { getPeaces } from '../../resources/peaces';
import Loading from '../../components/loading/loading';
import { GiganticText } from '../../components/layout/text/text';

const Home = () => {
    const [data, setData] = useState({peaces: [], loading: true});

    useEffect(() => {
        async function getData() {
            const peaces = await getPeaces();
            setData({peaces, loading: false});
        }

        getData();
    });

    const { loading, peaces } = data;

    return loading ? <GiganticText><Loading /></GiganticText> : <PeaceList peaces={peaces} />;
};

export default Home;