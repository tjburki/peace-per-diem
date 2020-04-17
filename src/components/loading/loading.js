import React from 'react';
import styles from './loading.module.scss';
import Icon from '../icon/icon';

const Loading = () =>
    <div className={styles.loading}>
        <Icon type='spinner' pulse />
    </div>;

export default Loading;