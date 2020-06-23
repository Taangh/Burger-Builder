import React, { useState } from "react";
import { connect } from "react-redux";
import Aux from "../Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerCloseHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerOpenHandler = () => {
    setSideDrawerIsVisible(true)
  };

  return (
    <Aux>
      <Toolbar
        sideDrawerOpened={sideDrawerOpenHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <SideDrawer
        open={sideDrawerIsVisible}
        closed={sideDrawerCloseHandler}
        isAuthenticated={props.isAuthenticated}
      />
      <main className={styles.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
