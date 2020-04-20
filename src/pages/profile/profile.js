import React, { useEffect, useState } from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styles from './profile.module.scss';
import UserPeaceList from "../../components/user-peace-list/user-peace-list";
import Icon from "../../components/icon/icon";
import { getLovesForUser } from '../../resources/users';

const Profile = () => {
  const { user, logout } = useAuth0();

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
            <div>Welcome, <b>{user.name}</b> (<a onClick={() => logout()}>logout</a>)</div>
            <div className={styles.totalLoves}><Icon type='heart' /> {totalLoves}</div>
        </div>
        <UserPeaceList onRefresh={callGetLovesForUser} />
    </div>
  );
};

export default Profile;