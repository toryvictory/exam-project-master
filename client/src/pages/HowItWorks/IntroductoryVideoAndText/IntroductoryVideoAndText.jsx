import React from 'react';
import introData from "./introData";
import styles from "./IntroductoryVideoAndText.module.sass";

const { article: { h2, paragraph}} = introData;

const IntroductoryVideoAndText = () => {
    return (
        <section className={styles.sectionContainer}>
            <div className={styles.videoContainer}>
                <iframe className={styles.video} title="Wistia video player" allowFullScreen frameBorder="0"
    scrolling="no" src="https://fast.wistia.net/embed/iframe/vfxvect60o" />
              </div>
            <article className={styles.textContainer}>
                <h2>{h2}</h2>
                <p>{paragraph}</p>
            </article>
        </section>
    );
};

export default IntroductoryVideoAndText;
