import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiArrowUpCircle } from '@mdi/js';
import styles from './ScrollUpButton.module.sass';

const ScrollUpButton = () => {

    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 100) {
            setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 100) {
            setShowScroll(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    window.addEventListener('scroll', checkScrollTop);

    return (
        <div className={showScroll ? styles.buttonContainer : styles.noDisplay}>
            <Icon className={styles.icon} onClick={scrollToTop} path={mdiArrowUpCircle} title="scroll up"/>
        </div>
    );
};

export default ScrollUpButton;
