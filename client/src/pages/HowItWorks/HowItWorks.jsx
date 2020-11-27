import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IntroductoryVideoAndText from "./IntroductoryVideoAndText/IntroductoryVideoAndText";
import styles from "./HowItWorks.module.sass";
import Steps from "./Steps/Steps";
import StartContestButton from "./StartContestButton/StartContestButton";
import FAQ from "./FAQ/FAQ";
import GetInTouchPanel from "./GetInTouchPanel/GetInTouchPanel";

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
                <div className={styles.sectionContainer}>
                    <FAQ/>
                </div>
                <GetInTouchPanel/>
            </main>
            <Footer/>
        </>
    );
};

export default HowItWorks;