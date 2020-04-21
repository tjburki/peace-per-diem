//Packages
import React, { useEffect, useState } from 'react';

//Helpers
import { useAuth0 } from '../../auth/auth0';
import useInfiniteScroll from '../../effects/infinite-scroll';

//Components
import PeaceList from '../../components/peace-list/peace-list';
import Loading from '../../components/loading/loading';
import { GiganticText } from '../../components/layout/text/text';

//Resources
import { getPeaces } from '../../resources/peaces';

const Home = () => {
    const [peaces, setPeaces] = useState([]);
    const [page, setPage] = useState(0);
    const [isFetching, setIsFetching] = useInfiniteScroll(getData);
    const [noMoreData, setNoMoreData] = useState(false);
    const [initialized, setIntialized] = useState(false);
    const [date, setDate] = useState(new Date());
    const { user } = useAuth0();

    async function getData() {
        if (noMoreData) return;

        const nextPage = page + 1;
        const newPeaces = await getPeaces(user ? user.user_id : null, nextPage, date);

        setPeaces(nextPage === 1 ? newPeaces : [...peaces, ...newPeaces]);
        setPage(nextPage);
        setIsFetching(false);
        setIntialized(true);
        setNoMoreData(!(newPeaces && newPeaces.length));
    }

    useEffect(() => {
        getData();
    }, []);
    
    return !initialized ? <GiganticText><Loading /></GiganticText> : <PeaceList peaces={peaces} />;
};

export default Home;