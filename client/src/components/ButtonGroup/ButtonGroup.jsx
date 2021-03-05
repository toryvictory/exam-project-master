import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AnswerButton from './AnswerButton/AnswerButton';
import styles from './ButtonGroup.module.sass';

const ButtonGroup = ({ data }) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  return (
    <ul className={styles.buttonsList}>
      {data.map((item, index) => (
        <li key={item.clarification}>
          <AnswerButton
            answer={item.answer}
            clarification={item.clarification}
            setActive={() => setActiveButtonIndex(index)}
            isActive={activeButtonIndex === index}
          />
        </li>
      ))}
    </ul>
  );
};

ButtonGroup.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    answer: PropTypes.string,
    clarification: PropTypes.string,
  })).isRequired,
};

export default ButtonGroup;
