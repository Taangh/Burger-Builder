import React, { useState, useEffect } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidation } from "../../shared/utility";

const Auth = (props) => {
  const [authForm, setAuthFrom] = useState({
    email: {
      label: "Email",
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      label: "Password",
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSingUp, setIsSignUp] = useState(false);

  const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });

    setAuthFrom(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSingUp
    );
  };

  const switchAuthModeHandler = () => {
    setIsSignUp(!isSingUp);
  };

  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      label={formElement.config.label}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={styles.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button buttonType="Success">SUBMIT</Button>
      </form>
      <Button buttonType="Danger" clicked={switchAuthModeHandler}>
        SWITCH TO {isSingUp ? "LOGIN" : "CREATE ACCOUNT"}
      </Button>
    </div>
  );
};

const mapDispatchStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSingUp) =>
      dispatch(actions.auth(email, password, isSingUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapDispatchStateToProps, mapDispatchToProps)(Auth);
