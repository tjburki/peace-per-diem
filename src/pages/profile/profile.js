import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import styles from './profile.module.scss';
import Spreader from "../../components/spreader/spreader";

const Profile = () => {
  const { user, loading, logout } = useAuth0();

  if (!user) {
      window.location = '/';
  }

  return (
    <div>
        <div className={styles.profileheader}>
            <div>Welcome, <b>{user.name}</b> (<a onClick={() => logout()}>logout</a>)</div>
        </div>
        <Spreader userId={user.user_id} />
    </div>
  );
};

export default Profile;