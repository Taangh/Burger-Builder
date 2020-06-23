import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    (ingredientKey) => {
      return (
        <li key={ingredientKey}>
          <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>:{" "}
          {props.ingredients[ingredientKey]}
        </li>
      );
    }
  );

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>An amazing burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price} PLN</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button buttonType="Danger" clicked={props.canceled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.continued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
