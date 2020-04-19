import React, { useEffect, useState } from 'react';
import styles from './user-peace-list.module.scss';
import Peace from '../peace/peace';
import { useAuth0 } from '../../react-auth0-spa';
import { getPeacesForUser, createUpdatePeace } from '../../resources/peaces';
import { isToday } from '../../helpers';
import Loading from '../loading/loading';
import Icon from '../icon/icon';
import { GiganticText } from '../layout/text/text';

const UserPeaceList = () => {
    const { user } = useAuth0();
    const defaultTodaysPeace = { text: '', user_id: user.user_id };

    const [todaysPeaceDraft, setTodaysPeaceDraft] = useState('');
    const [todaysPeace, setTodaysPeace] = useState(defaultTodaysPeace);
    const [oldPeaces, setOldPeaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [initialized, setInitialized] = useState(false);

    async function callGetPeacesForUser() {
        setLoading(true);
        const userPeaces = await getPeacesForUser(user.user_id);
        const todaysPeaceToSet = userPeaces && userPeaces.length && isToday(new Date(userPeaces[0].created)) 
            ?   userPeaces.shift() 
            :   defaultTodaysPeace
        setTodaysPeace(todaysPeaceToSet);
        setOldPeaces(userPeaces);
        setEditing(!todaysPeaceToSet.text);
        setInitialized(true);
        setLoading(false);
    }

    useEffect(() => {
        callGetPeacesForUser();
    }, []);

    async function callCreateUpdatePeace() {
        await createUpdatePeace({ ...todaysPeace, text: todaysPeaceDraft });
        callGetPeacesForUser();
    }

    function peaceChange(e) {
        const text = e.target.value;
        setTodaysPeaceDraft(text);
    }

    function submitPeace(e) {
        e.preventDefault();
        callCreateUpdatePeace();
    }

    function edit() {
        setTodaysPeaceDraft(todaysPeace.text);
        setEditing(true);
    }

    function cancelEdit() {
        setTodaysPeaceDraft(''); //Probably unnecessary
        setEditing(false);
    }

    if (loading) return <GiganticText><Loading /></GiganticText>;

    return (
        <div>
            <div className={styles.todayspeace}>   
                <div className={styles.todayspeacetitle}>
                    <div>Today's Peace</div>
                    <div className={styles.editcontrol}>
                        {
                            editing && todaysPeace.text
                                ?   <span onClick={cancelEdit} title='cancel'><Icon type='times' /></span>
                                :   editing || loading || !initialized
                                    ?   null
                                    :   <span onClick={edit} title='edit'><Icon type='edit' /></span>
                        }
                    </div>
                </div>   
                {
                    editing
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
                                <Peace text={todaysPeace.text} />
                            </div>
                }
            </div>
            {
                oldPeaces.length
                    ?   <div className={styles.oldpeaces}>
                            {
                                oldPeaces.map(peace => <Peace key={peace.peace_id} text={peace.text} date={peace.created} />)
                            }
                        </div>
                    :   null
            }
        </div>
    );
};

export default UserPeaceList;