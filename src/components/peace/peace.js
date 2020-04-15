import React from 'react';
import styles from './peace.module.scss';

const Peace = ({text, author}) =>
    <div className={styles.peace}>
        <div className={styles.text}>
            {text}
        </div>
        {
            author &&
            <div className={styles.author}>
                <a href='#'>{author}</a>
            </div>
        }
    </div>;

export default Peace;