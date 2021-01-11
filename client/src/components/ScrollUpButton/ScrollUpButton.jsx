import React, { useState, useEffect, useCallback } from 'react';
import Icon from '@mdi/react';
import { mdiArrowUpCircle } from '@mdi/js';
import styles from './ScrollUpButton.module.sass';

const ScrollUpButton = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false);
    }
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [checkScrollTop]);

  return (
    <div onClick={scrollToTop} className={showScroll ? styles.buttonContainer : styles.noDisplay}>
      <Icon className={styles.icon} path={mdiArrowUpCircle} title="scroll up" />
    </div>
  );
};

export default ScrollUpButton;
