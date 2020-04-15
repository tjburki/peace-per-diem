import React from 'react';
import Peace from '../peace/peace';
import styles from './body.module.scss';

const Body = () =>
    <div className={styles.body}>
        <Peace text='yo yo yo what up' author='joe blow' />
    </div>;

export default Body;