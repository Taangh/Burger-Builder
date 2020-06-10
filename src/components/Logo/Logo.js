import React from "react";
import styles from "./Logo.module.css"
import burgerLogo from '../../assets/images/burger-logo.png'
//import burgerLogo from '../../assets/ images/burger-logo.png';

const logo = (props) => (
  <div className={styles.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="Burger Builder" />
  </div>
);

export default logo;
