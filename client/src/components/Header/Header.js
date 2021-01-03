import React from 'react';
import { useSelector } from "react-redux";
import { authSelector } from "../../selectors";
import { Link } from 'react-router-dom';
import Icon from "@mdi/react";
import { mdiPhone } from '@mdi/js';
import LoginButtons from "./LoginButtons/LoginButtons";
import DropDownNavigation from "./DropDownNavigation/DropDownNavigation";
import styles from './Header.module.sass';
import CONSTANTS from '../../constants';

function Header() {

  const { isFetching } = useSelector(authSelector);

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

        <div className={styles.loginSignUpHeaders}>
            <div className={styles.headerRow}>
                <div className={styles.numberContainer}>
                  <Icon path={mdiPhone} className={styles.icon}/>
                  <span>(877)&nbsp;355-3585</span>
                </div>
                <div className={styles.userButtonsContainer}>
                  <LoginButtons/>
                </div>
            </div>
        </div>

      <div className={styles.navContainer}>
          <div className={styles.headerRow}>
            <Link to="/">
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
                className={styles.logo}
                alt="blue_logo"
              />
            </Link>
            <div className={styles.leftNav}>
              <DropDownNavigation/>
              <Link className={styles.startContestBtn} to="/startContest">
                  START CONTEST
              </Link>
            </div>
          </div>
      </div>

    </div>
  );
}

export default Header;
