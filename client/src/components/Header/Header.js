import React, { useCallback } from 'react';
import styles from './Header.module.sass';
import { Link } from 'react-router-dom';
import CONSTANTS, { ROLES } from '../../constants';
import Icon from "@mdi/react";
import { mdiPhone } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../actions/auth/authActionCreators';
import { authSelector } from '../../selectors';
import DropDownNavigation from "./DropDownNavigation/DropDownNavigation";

function Header() {
  const { isFetching, user } = useSelector(authSelector);

  const dispatch = useDispatch();

  const logoutAction = useCallback(() => void dispatch(logoutRequest()), [
    dispatch,
    logoutRequest,
  ]);

  const renderLoginButtons = () => {
    if (user) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                user.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${user.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${user.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
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
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="http:/www.google.com"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={logoutAction}>Logout</span>
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
    } else {
      return (
        <>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>LOGIN</span>
          </Link>
          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <span className={styles.btn}>SIGN UP</span>
          </Link>
        </>
      );
    }
  };

  if (isFetching) {
    return null;
  }
  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href="http://www.google.com">Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <Icon path={mdiPhone} className={styles.icon}/>
          <span>(877)&nbsp;355-3585</span>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
          className={styles.logo}
          alt="blue_logo"
        />
        <div className={styles.leftNav}>
          <DropDownNavigation/>
            <Link className={styles.startContestBtn} to="/startContest">
              START CONTEST
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
