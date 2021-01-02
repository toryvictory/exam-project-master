import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as EDIT_USER_ACTION_CREATORS from '../../actions/user/editUserActionCreators';
import * as USER_PROFILE_ACTION_CREATORS from "../../actions/userProfile/userProfileActionCreators";
import ChangeUserInfoForm from "../forms/ChangeUserInfoForm/ChangeUserInfoForm";
import { userProfileSelector, userSelector } from "../../selectors";
import CONSTANTS from "../../constants";
import styles from "./UserInfo.module.sass";

const UserInfo = () => {

    const user = useSelector(userSelector);
    const { isEdit } = useSelector(userProfileSelector);
    const dispatch = useDispatch();
    const userActionCreators = {
        updateUserData: EDIT_USER_ACTION_CREATORS.updateUserData,
        changeEditModeOnUserProfile: USER_PROFILE_ACTION_CREATORS.changeEditModeOnUserProfile,
    };
    const { updateUserData, changeEditModeOnUserProfile } = bindActionCreators(userActionCreators, dispatch);

    const {
        avatar,
        firstName,
        lastName,
        displayName,
        email,
        role,
        balance,
    } = user;
    return (
        <div className={styles.mainContainer}>
            {isEdit ? (
                <ChangeUserInfoForm onSubmit={(values) => {
                    updateUserData(values);
                    changeEditModeOnUserProfile(false);
                }}/>
            ) : (
                <div className={styles.infoContainer}>
                    <img
                        src = {
                            avatar ? `${CONSTANTS.publicURL}${avatar}` : CONSTANTS.ANONYM_IMAGE_PATH
                        }
                        className={styles.avatar}
                        alt="user"
                    />
                    <div className={styles.infoContainer}>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>First Name</span>
                            <span className={styles.info}>{firstName}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Last Name</span>
                            <span className={styles.info}>{lastName}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Display Name</span>
                            <span className={styles.info}>{displayName}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.info}>{email}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Role</span>
                            <span className={styles.info}>{role}</span>
                        </div>
                        {role === CONSTANTS.CREATOR && (
                            <div className={styles.infoBlock}>
                                <span className={styles.label}>Balance</span>
                                <span className={styles.info}>{`${balance}$`}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div onClick={
                () => changeEditModeOnUserProfile(!isEdit)
            }
                 className={styles.buttonEdit}
            >
                {isEdit ? "Cancel" : "Edit"}
            </div>
        </div>
    );
};

export default UserInfo;
