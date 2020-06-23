import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/index";
import { updateObject, checkValidation } from "../../../shared/utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
      name: {
        label: "Name",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        label: "Street",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        label: "Zip Code",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        label: "Country",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        label: "E-Mail Address",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "E-Mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliverMethod: {
        label: "Delivery Method",
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
  );
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementId in orderForm) {
      formData[formElementId] = orderForm[formElementId].value;
    }

    const orderData = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(orderData, props.token);
  };

  const inputChangedHandler = (event, inputId) => {
    const updatedFormElement = updateObject(orderForm[inputId], {
      value: event.target.value,
      valid: checkValidation(event.target.value, orderForm[inputId].validation),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputId]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  let form = (
    <form>
      {formElementsArray.map((formElement) => (
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
      ))}
      <Button
        buttonType="Success"
        disabled={!formIsValid}
        clicked={orderHandler}
      >
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={styles.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
