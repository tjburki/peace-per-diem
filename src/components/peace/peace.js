import React from 'react';
import styles from './peace.module.scss';

const Peace = ({text, author, date}) =>
    <div className={styles.peace}>
        <div className={styles.text}>
            {text}
        </div>
        {
            (author || date) &&
            <div className={styles.author}>
                {
                    `${(author ? `${author} ` : '')}${new Date(date).toLocaleDateString()}`
                }
            </div>
        }
    </div>;

export default Peace;