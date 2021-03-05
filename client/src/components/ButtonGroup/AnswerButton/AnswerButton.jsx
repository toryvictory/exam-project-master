import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './AnswerButton.module.sass';

const AnswerButton = ({
  answer, clarification, setActive, isActive,
}) => {
  const handleFocus = () => setActive();
  const containerClasses = classNames(styles.container, { [styles.container_active]: isActive });
  const answerClasses = classNames(styles.answer, { [styles.answer_active]: isActive });
  const clClasses = classNames(styles.clarification, { [styles.clarification_active]: isActive });

  return (
    <div role="button" className={containerClasses} onFocus={handleFocus} tabIndex={0}>
      <div className={answerClasses}>{answer}</div>
      <div className={clClasses}>{clarification}</div>
    </div>
  );
};

AnswerButton.propTypes = {
  answer: PropTypes.string.isRequired,
  clarification: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default AnswerButton;
