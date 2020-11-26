import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IntroductoryVideoAndText from "./IntroductoryVideoAndText/IntroductoryVideoAndText";
import styles from "./HowItWorks.module.sass";

const HowItWorks = () => {
    return (
        <>
            <Header/>
            <main>
                <div className={styles.sectionContainer}>
                    <IntroductoryVideoAndText/>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default HowItWorks;