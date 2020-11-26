import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IntroductoryVideoAndText from "./IntroductoryVideoAndText/IntroductoryVideoAndText";
import styles from "./HowItWorks.module.sass";
import Steps from "./Steps/Steps";
import StartContestButton from "./StartContestButton/StartContestButton";
import StyledHeading from "../../components/StyledHeading/StyledHeading";

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
                <StyledHeading h2={'Frequently Asked Questions'}/>
            </main>
            <Footer/>
        </>
    );
};

export default HowItWorks;