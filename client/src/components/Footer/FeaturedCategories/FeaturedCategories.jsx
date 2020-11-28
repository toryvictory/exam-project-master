import React from 'react';
import {categories} from './categoriesData';
import styles from "./FeaturedCategories.module.sass";

const FeaturedCategories = () => {

    const categoryItems = categories.map((item, index) =>
        <li key={index}>
            <a className={styles.category}
               href="https://www.google.com/">
                {item}
            </a>
        </li>
    );

    return (
        <section className={styles.container}>
            <div className={styles.textContainer}>
                <h1 className={styles.heading}>FEATURED CATEGORIES</h1>
                <ul className={styles.categoryList}>
                    {categoryItems}
                </ul>
                <div className={styles.ratingDesc}>
                    <a className={styles.category}
                       href="https://www.shopperapproved.com/reviews/squadhelp.com/">
                        squadhelp.com has a Shopper Approved rating of 4.9/5 based on 2779 ratings and reviews.
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCategories;