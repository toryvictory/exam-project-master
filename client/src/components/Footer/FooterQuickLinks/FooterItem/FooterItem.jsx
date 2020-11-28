import React from 'react';
import styles from './FooterItem.module.sass';

const FooterItem = ({ item }) => {
    return (
        <div className={styles.itemContainer} key={item.title}>
            <h4>{item.title}</h4>
            <ul>
                {item.items.map((i) => (
                    <li key={i}>
                        <a key={i} href="https://google.com">
                            {i}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FooterItem;
