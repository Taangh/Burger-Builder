import React from "react";
import styles from './MenuButton.module.css';

const menuButton = (props) => (
    <div onClick={props.clicked} className={styles.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default menuButton;
