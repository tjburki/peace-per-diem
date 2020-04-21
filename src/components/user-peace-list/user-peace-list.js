import React, { useEffect, useState } from 'react';
import styles from './user-peace-list.module.scss';
import Peace from '../peace/peace';
import { useAuth0 } from '../../react-auth0-spa';
import { getPeacesForUser, createUpdatePeace } from '../../resources/peaces';
import { isToday } from '../../helpers';
import Loading from '../loading/loading';
import { GiganticText } from '../layout/text/text';
import useInfiniteScroll from '../../effects/infinite-scroll';

const UserPeaceList = ({onRefresh}) => {
    const { user } = useAuth0();
    const defaultTodaysPeace = { text: '', user_id: user.user_id };

    const [todaysPeaceDraft, setTodaysPeaceDraft] = useState('');
    const [todaysPeace, setTodaysPeace] = useState(defaultTodaysPeace);
    const [oldPeaces, setOldPeaces] = useState([]);
    const [page, setPage] = useState(0);
    const [isFetching, setIsFetching] = useInfiniteScroll(callGetPeacesForUser);
    const [noMoreData, setNoMoreData] = useState(false);
    const [initialized, setInitialized] = useState(false);

    async function callGetPeacesForUser(resetPage) {
        if (noMoreData && !resetPage) return;

        const nextPage = (resetPage ? 0 : page) + 1;
        const firstPage = nextPage === 1;

        if (firstPage && onRefresh) onRefresh();
        const userPeaces = await getPeacesForUser(user.user_id, nextPage);

        if (firstPage) {
            const todaysPeaceToSet = userPeaces && userPeaces.length && isToday(new Date(userPeaces[0].created)) 
                ?   userPeaces.shift() 
                :   defaultTodaysPeace
            setTodaysPeace(todaysPeaceToSet);
        }
        
        setPage(nextPage);
        setOldPeaces(firstPage ? userPeaces : [...oldPeaces, ...userPeaces]);
        setNoMoreData(!userPeaces);
        setIsFetching(false);
        setInitialized(true);
    }

    useEffect(() => {
        callGetPeacesForUser(true);
    }, []);

    async function callCreateUpdatePeace() {
        await createUpdatePeace({ ...todaysPeace, text: todaysPeaceDraft });
        setTodaysPeaceDraft('');
        callGetPeacesForUser(true);
    }

    function peaceChange(e) {
        const text = e.target.value;
        setTodaysPeaceDraft(text);
    }

    function submitPeace(e) {
        e.preventDefault();
        callCreateUpdatePeace();
    }

    function removeOldPeace(peaceId) {
        setOldPeaces(oldPeaces.filter(peace => peace.peace_id !== peaceId));
        if (onRefresh) onRefresh();
    }

    if ((isFetching && !(oldPeaces.length || todaysPeace.text)) || !initialized) return <div className={styles.loader}><GiganticText><Loading /></GiganticText></div>;

    return (
        <div>
            <div className={styles.todayspeace}>   
                <div className={styles.todayspeacetitle}>
                    <div>Today's Peace</div>
                </div>   
                {
                    !(todaysPeace && todaysPeace.text)
                        ?   <form className={styles.form} onSubmit={submitPeace}>
                                <textarea 
                                    rows='6' 
                                    required 
                                    maxLength={255} 
                                    value={todaysPeaceDraft} 
                                    onChange={peaceChange} 
                                    className='form-control' 
                                    placeholder='Something that has inspired you or given you hope today'
                                > 
                                </textarea>
                                <button type="submit" className='btn btn-outline-dark'>
                                    speak your peace
                                </button>
                            </form>
                        :   <div className={styles.todayspeacedisplay}>
                                <Peace id={todaysPeace.peace_id} userId={todaysPeace.user_id} text={todaysPeace.text} loves={todaysPeace.loves} userLoves={todaysPeace.userloves} onDelete={() => { setTodaysPeace(defaultTodaysPeace); if (onRefresh) onRefresh(); }} />
                            </div>
                }
            </div>
            {
                oldPeaces.length
                    ?   <div className={styles.oldpeaces}>
                            {
                                oldPeaces.map(peace => <Peace key={peace.peace_id} id={peace.peace_id} userId={peace.user_id} text={peace.text} date={peace.created} loves={peace.loves} userLoves={peace.userloves} onDelete={() => removeOldPeace(peace.peace_id)} />)
                            }
                        </div>
                    :   null
            }
        </div>
    );
};

export default UserPeaceList;