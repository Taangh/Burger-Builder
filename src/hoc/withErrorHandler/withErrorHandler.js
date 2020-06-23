import React, { useState, useEffect } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";
import useHttpErrorHanlder from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axois) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHanlder(axois);
    
    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );

  };
};

export default withErrorHandler;
