import React, { useState } from 'react';
import styles from './peace.module.scss';
import { useAuth0 } from '../../react-auth0-spa';
import { deletePeace } from '../../resources/peaces';
import Icon from '../icon/icon';

const Peace = ({id, text, author, date, userId}) => {
    const { user } = useAuth0();
    const authorIsUser = userId && user && userId === user.user_id;
    const [visible, setVisible] = useState(true); //TODO: Not like this...anything but this

    async function deleteThisPeace() {
        if (!window.confirm('Are you sure you want to delete this peace?')) return;

        await deletePeace(id);
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className={styles.peace}>
            <div className={styles.content}>
                <div className={styles.text}>
                    {text}
                </div>
                {
                    (author || date) &&
                    <div className={styles.author}>
                        {
                            `${(author ? `${(authorIsUser ? 'You' : author)} ` : '')}${new Date(date).toLocaleDateString()}`
                        }
                    </div>
                }
            </div>
            {
                user && userId && authorIsUser && //Get rid of authorisuser for new func
                <div className={styles.actions}>
                    {
                        !authorIsUser && false && //todo: false
                        <div title='love'>
                            <Icon type='heart' />
                        </div>
                    }
                    {
                        !authorIsUser //todo: false below
                            ?   false && <div title='report'>
                                    <Icon type='flag' />
                                </div>
                            :   <div title='delete' onClick={deleteThisPeace}>
                                    <Icon type='trash' />
                                </div>
                    }
                </div>
            }
        </div>
    );
};

export default Peace;