import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styles from './profile.module.scss';
import UserPeaceList from "../../components/user-peace-list/user-peace-list";

const Profile = () => {
  const { user, logout } = useAuth0();

  if (!user) {
      window.location = '/';
  }

  return (
    <div>
        <div className={styles.profileheader}>
            <div>Welcome, <b>{user.name}</b> (<a onClick={() => logout()}>logout</a>)</div>
        </div>
        <UserPeaceList />
    </div>
  );
};

export default Profile;