import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../selectors";
import { Link, useHistory } from "react-router-dom";
import React, { useCallback } from "react";
import Icon from "@mdi/react";
import { mdiChevronDown } from '@mdi/js';
import { logoutRequest } from "../../../actions/auth/authActionCreators";
import styles from "../Header.module.sass";
import CONSTANTS from "../../../constants";


const LoginButtons = () => {

    const user = useSelector(userSelector);
    const { avatar, displayName } = user || {};
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = useCallback(() => {
        history.push('/');
        dispatch(logoutRequest());
    }, [
        dispatch,
        history,
    ]);

    if (user) {
        return (
            <>
                <div className={styles.userInfo}>
                    <img
                        src={
                            avatar ? `${CONSTANTS.publicURL}${avatar}` : CONSTANTS.ANONYM_IMAGE_PATH
                        }
                        alt="user"
                    />
                    <span>{`Hi, ${displayName}`}</span>
                    <Icon path={mdiChevronDown} className={styles.iconChevron}/>
                    <ul>
                        <li>
                            <Link to="/dashboard" style={{textDecoration: 'none'}}>
                                <span>View Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/account" style={{textDecoration: 'none'}}>
                                <span>My Account</span>
                            </Link>
                        </li>
                        <li>
                            <a
                                href="http://www.google.com"
                                target="_blank"
                                rel="noreferrer"
                                style={{textDecoration: 'none'}}
                            >
                                <span>Messages</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://www.google.com"
                                target="_blank"
                                rel="noreferrer"
                                style={{textDecoration: 'none'}}
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
    } else {
        return (
            <>
                <Link to="/login" style={{textDecoration: 'none'}}>
                    <span>LOGIN</span>
                </Link>
                <Link to="/signup" style={{textDecoration: 'none'}}>
                    <span>SIGN UP</span>
                </Link>
            </>
        );
    }
};

export default LoginButtons;