import React from 'react';
import styles from './StyledHeading.module.sass';

const StyledHeading = ({h2}) => {
    return (
        <div className={styles.headingContainer}>
            <h2 className={styles.heading}>{h2}</h2>
        </div>
    );
};

export default StyledHeading;
