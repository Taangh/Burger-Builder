import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NaviagtionItem';

const navigationItems = () => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>

    </ul>
);

export default navigationItems;