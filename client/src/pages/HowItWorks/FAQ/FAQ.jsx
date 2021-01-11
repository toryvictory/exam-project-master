import React from 'react';
import StyledHeading from '../../../components/StyledHeading/StyledHeading';
import faq from './FAQdata';
import FAQArticle from './FAQArticle/FAQArticle';

const FAQ = () => {
  const articles = faq.map((item, index) => (
    <FAQArticle
      key={index}
      h3={faq[index].h3}
      text={faq[index].text}
      isEven={(index + 1) % 2 === 0}
    />
  ));
  return (
    <section>
      <StyledHeading h2="Frequently Asked Questions" />
      {articles}
    </section>
  );
};

export default FAQ;
