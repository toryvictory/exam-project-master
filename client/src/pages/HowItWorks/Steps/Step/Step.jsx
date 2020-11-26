import React from 'react';
import styles from './Step.module.sass';

const Step = ({stepNumber, h3, p}) => {
    return (
        <article className={styles.stepContainer}>
            <div className={styles.stepCircle}>{stepNumber}</div>
            <h3 className={styles.heading}>{h3}</h3>
            <p className={styles.paragraph}>{p}</p>
        </article>
    );
};

export default Step;
