import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../icon/icon';
import { SmallText, LargeText } from '../layout/text/text';
import styles from './logo.module.scss';

const Logo = () => 
    <Link className={styles.logo} to="/">
        <div className={styles.icon}>
            <Icon type={'dove'} />
        </div>
        <div>
            <LargeText>peace per diem</LargeText>
            <SmallText>daily positive meditations</SmallText>
        </div>
    </Link>;

export default Logo;