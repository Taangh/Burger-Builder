import React from 'react'
import styles from "./Toolbar.module.css"
import Logo from "../../Logo/Logo";
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuButton from './MenuButton/MenuButton';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <MenuButton clicked={props.sideDrawerOpened}/>
        <Logo height="80%" />
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;