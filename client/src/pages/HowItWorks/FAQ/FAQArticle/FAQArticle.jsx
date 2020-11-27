import React from 'react';
import classNames from "classnames";
import styles from './FAQArticle.module.sass';

const FAQArticle = ({isEven, h3, text}) => {
    const artClass = classNames(styles.article, {
        [styles.evenArticle]: isEven,
    });

    const paragraphs = text.map((item, index)=><p key={index} dangerouslySetInnerHTML={({__html: text[index]})}/>);

    return (
        <article className={artClass}>
         <h3 className={styles.heading}>{h3}</h3>
            {paragraphs}
        </article>
    );
};

export default FAQArticle;
