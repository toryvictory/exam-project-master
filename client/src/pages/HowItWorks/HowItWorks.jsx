import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IntroductoryVideoAndText from "./IntroductoryVideoAndText/IntroductoryVideoAndText";
import styles from "./HowItWorks.module.sass";
import Steps from "./Steps/Steps";
import StartContestButton from "./StartContestButton/StartContestButton";

const HowItWorks = () => {
    return (
        <>
            <Header/>
            <main>
                <div className={styles.sectionContainer}>
                    <IntroductoryVideoAndText/>
                </div>
                <div className={styles.sectionContainer}>
                    <Steps/>
                </div>
                <StartContestButton/>
            </main>
            <Footer/>
        </>
    );
};

export default HowItWorks;