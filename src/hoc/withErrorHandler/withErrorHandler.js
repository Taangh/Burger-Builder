import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axois) => {
  return class extends Component {
    state = {
      error: null,

    };

    componentWillMount() {
      this.requestInterceptor = axois.interceptors.request.use(request => {
        this.setState({ error: null });
        return request
      });

      this.responseInterceptor = axois.interceptors.response.use(response => response, (error) => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount() {
        axois.interceptors.request.eject(this.requestInterceptor)
        axois.interceptors.response.eject(this.responseInterceptor)
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
