import React, { Component } from "react";
import {connect} from 'react-redux';
import Aux from "../Aux/Aux";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true});
  }

  render() {
    return (
      <Aux>
        <Toolbar sideDrawerOpened={this.sideDrawerOpenHandler} isAuthenticated={this.props.isAuthenticated}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler} isAuthenticated={this.props.isAuthenticated}/>
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
