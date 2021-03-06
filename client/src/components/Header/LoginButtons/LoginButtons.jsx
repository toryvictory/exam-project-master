import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import React, { useCallback, useLayoutEffect } from 'react';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import { userSelector } from '../../../selectors';
import { logoutRequest } from '../../../actions/auth/authActionCreators';
import styles from '../Header.module.sass';
import CONSTANTS from '../../../constants';
import { getEvents } from '../../../actions/events/eventsActionCreators';

const LoginButtons = () => {
  const user = useSelector(userSelector);
  const { avatar, displayName, id } = user || {};
  const events = useSelector((state) => state.eventsStore.events);
  const eventsNotificationReducer = (acc, cur) => (cur.isNotificationOn ? acc + 1 : acc);
  const eventsNotificationsCount = events.reduce(eventsNotificationReducer, 0);

  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(() => {
    history.push('/');
    dispatch(logoutRequest());
  }, [
    dispatch,
    history,
  ]);

  useLayoutEffect(() => { dispatch(getEvents(id)); }, [id]);

  if (user) {
    return (
      <>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <img
              src={
                              avatar ? `${CONSTANTS.publicURL}${avatar}` : CONSTANTS.ANONYM_IMAGE_PATH
                        }
              alt="user"
            />
            {!!eventsNotificationsCount
            && <div className={`${styles.userNotification} ${styles.userNotification_avatar}`}>{eventsNotificationsCount}</div>}
          </div>
          <span>{`Hi, ${displayName}`}</span>

          <Icon path={mdiChevronDown} className={styles.iconChevron} />
          <ul>
            <li>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <span>View Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/account" style={{ textDecoration: 'none' }}>
                <span>My Account</span>
              </Link>
            </li>
            <li>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <span>My Events</span>
                {!!eventsNotificationsCount
                && <span className={`${styles.userNotification} ${styles.userNotification_li}`}>{eventsNotificationsCount}</span>}
              </Link>
            </li>
            <li>
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a
                href="http://www.google.com"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <span>Affiliate Dashboard</span>
              </a>
            </li>
            <li>
              <span onClick={logout}>Logout</span>
            </li>
          </ul>
        </div>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
          className={styles.emailIcon}
          alt="email"
        />
      </>
    );
  }
  return (
    <>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <span>LOGIN</span>
      </Link>
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <span>SIGN UP</span>
      </Link>
    </>
  );
};

export default LoginButtons;
