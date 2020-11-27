import React from 'react';
import styles from './Steps.module.sass';
import Step from './Step/Step';
import stepsData from "./stepsData";

const Steps = () => {
    const steps = stepsData.map(({h3, paragraph}, index) => {
        return (
            <li key={index}>
        <Step key={index} stepNumber={index+1} h3={stepsData[index].h3} p={stepsData[index].paragraph}/>
            </li>);
    });
    return (
        <section className={styles.stepsContainer}>
            <h2 className={styles.sectionHeader}>5 Simple Steps</h2>
            <ul className={styles.list}> {steps} </ul>

        </section>
    );
};

export default Steps;
