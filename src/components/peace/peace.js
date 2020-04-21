import React, { useState } from 'react';
import styles from './peace.module.scss';
import { useAuth0 } from '../../auth/auth0';
import { deletePeace, lovePeace, unlovePeace, flagPeace } from '../../resources/peaces';
import Icon from '../icon/icon';

const Peace = ({id, text, author, date, userId, userLoves = false, loves = 1, onDelete}) => {
    const { user } = useAuth0();
    const authorIsUser = userId && user && userId === user.user_id;
    const [loved, setLoved] = useState(userLoves);
    const [visible, setVisible] = useState(true); //TODO: Not like this...anything but this

    async function deleteThisPeace() {
        if (!window.confirm('Are you sure you want to delete this peace?')) return;

        await deletePeace(id);
        setVisible(false);

        if (onDelete) onDelete();
    }

    async function loveThisPeace() {
        await lovePeace(id, user.user_id);
        setLoved(true);
    }

    async function unloveThisPeace() {
        await unlovePeace(id, user.user_id);
        setLoved(false);
    }

    async function flagThisPeace() {
        if (!window.confirm('Are you sure you want to report this peace?')) return;

        await flagPeace(id, user.user_id);
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className={`${styles.peace} ${(authorIsUser ? styles.myPeace : '')}`}>
            <div className={styles.content}>
                <div className={styles.text}>
                    {text}
                </div>
                {
                    (author || date) &&
                    <div className={styles.info}>
                        {
                            author ? <span className={styles.author}>{(authorIsUser ? <b>You</b> : author)}</span> : null
                        }
                        <span>{new Date(date).toLocaleDateString()}</span>
                    </div>
                }
            </div>
            {
                user && userId &&
                <div className={(!authorIsUser ? styles.actions : styles.myActions)}>
                    {
                        authorIsUser
                            ?   <div className={styles.userloves} title='loves'>
                                    <Icon type='heart' /> {loves}
                                </div>
                            :   !loved
                                ?   <div title='love' className={styles.toLove} onClick={loveThisPeace}>
                                        <Icon type='heart' />
                                    </div>
                                :   <div title='stop loving' className={styles.loved} onClick={unloveThisPeace}>
                                        <Icon type='heart' />
                                    </div>
                    }
                    {
                        !authorIsUser //todo: false below
                            ?   <div className={styles.report} title='report' onClick={flagThisPeace}>
                                    <Icon type='flag' />
                                </div>
                            :   <div className={styles.delete} title='delete' onClick={deleteThisPeace}>
                                    <Icon type='trash' />
                                </div>
                    }
                </div>
            }
        </div>
    );
};

export default Peace;