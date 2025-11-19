//Packages
import React, { useState } from "react";

//Helpers
import { useAuth0 } from "../../auth/auth0";

//Components
import UserPeaceList from "../../components/user-peace-list/user-peace-list";
import Icon from "../../components/icon/icon";
import { Link } from 'react-router-dom';

//Resources
import { getLovesForUser } from '../../resources/users';

//Styles
import styles from './profile.module.scss';

const Profile = () => {
  const { user } = useAuth0();

  if (!user) {
      window.location = '/';
  }

  const [totalLoves, setTotalLoves] = useState(0);

  async function callGetLovesForUser() {
    const userLoves = await getLovesForUser(user.user_id);
    setTotalLoves(userLoves);
  }

  return (
    <div>
        <div className={styles.profileheader}>
            <div>Welcome, <b>{user.name}</b> ({<Link className={styles.logout} to='/logout'>logout</Link>})</div>
            <div className={styles.totalLoves} title="total loves"><Icon type='heart' /> {totalLoves}</div>
        </div>
        <UserPeaceList onRefresh={callGetLovesForUser} />
    </div>
  );
};

export default Profile;