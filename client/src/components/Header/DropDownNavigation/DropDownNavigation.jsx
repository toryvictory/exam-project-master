import React from 'react';
import styles from "./DropDownNavigation.module.sass";
import Icon from "@mdi/react";
import { mdiChevronDown } from '@mdi/js';
import { Link } from "react-router-dom";

const DropDownNavigation = () => {
    return (
        <div className={styles.nav}>
            <ul>
                <li>
                    <span className={styles.navSectionHeading}>NAME IDEAS</span>
                    <Icon path={mdiChevronDown} className={styles.iconChevron}/>
                    <ul>
                        <li>
                            <a href="http://www.google.com">Beauty</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">Consulting</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">E-Commerce</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">Fashion & Clothing</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">Finance</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">Real Estate</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">Tech</a>
                        </li>
                        <li className={styles.last}>
                            <a href="http://www.google.com">More Categories</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <span className={styles.navSectionHeading}>CONTESTS</span>
                    <Icon path={mdiChevronDown} className={styles.iconChevron}/>
                    <ul>
                        <li>
                            <Link to="/howItWorks">HOW IT WORKS</Link>
                        </li>
                        <li>
                            <a href="http://www.google.com">PRICING</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">AGENCY SERVICE</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">ACTIVE CONTESTS</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">WINNERS</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">LEADERBOARD</a>
                        </li>
                        <li className={styles.last}>
                            <a href="http://www.google.com">BECOME A CREATIVE</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <span className={styles.navSectionHeading}>Our Work</span>
                    <Icon path={mdiChevronDown} className={styles.iconChevron}/>
                    <ul>
                        <li>
                            <a href="http://www.google.com">NAMES</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">TAGLINES</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">LOGOS</a>
                        </li>
                        <li className={styles.last}>
                            <a href="http://www.google.com">TESTIMONIALS</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <span className={styles.navSectionHeading}>Names For Sale</span>
                    <Icon path={mdiChevronDown} className={styles.iconChevron}/>
                    <ul>
                        <li>
                            <a href="http://www.google.com">POPULAR NAMES</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">SHORT NAMES</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">INTRIGUING NAMES</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">NAMES BY CATEGORY</a>
                        </li>
                        <li>
                            <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                        </li>
                        <li className={styles.last}>
                            <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <span className={styles.navSectionHeading}>Blog</span>
                    <Icon path={mdiChevronDown} className={styles.iconChevron}/>
                    <ul>
                        <li>
                            <a target="_blank" href="http://www.google.com">
                                ULTIMATE NAMING GUIDE
                            </a>
                        </li>
                        <li>
                            <a href="http://www.google.com">
                                POETIC DEVICES IN BUSINESS NAMING
                            </a>
                        </li>
                        <li>
                            <a href="http://www.google.com">CROWDED BAR THEORY</a>
                        </li>
                        <li className={styles.last}>
                            <a href="http://www.google.com">ALL ARTICLES</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default DropDownNavigation;
