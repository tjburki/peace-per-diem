import React from 'react';
import styles from './text.module.scss';

export const GiganticText = ({children}) =>
    <div className={styles.gigantic}>
        {children}
    </div>;

export const LargeText = ({children}) =>
    <div className={styles.large}>
        {children}
    </div>;

export const SmallText = ({children}) =>
    <div className={styles.small}>
        {children}
    </div>;

export const CenterText = ({children}) =>
    <div className={styles.center}>
        {children}
    </div>;