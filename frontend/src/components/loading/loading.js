import React from 'react';
import styles from './loading.module.scss';
import Icon from '../icon/icon';

const Loading = ({text}) =>
    <div className={styles.loading}>
        <Icon type='spinner' pulse />
        {
            text && <span className={styles.text}>{text}</span>
        }
    </div>;

export default Loading;