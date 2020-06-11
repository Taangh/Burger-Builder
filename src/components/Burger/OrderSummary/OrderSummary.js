import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingredientKey) => {
        return (
          <li key={ingredientKey}>
            <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>
            : {this.props.ingredients[ingredientKey]}
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
          <strong>Total Price: {this.props.price} PLN</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button buttonType="Danger" clicked={this.props.canceled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={this.props.continued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
