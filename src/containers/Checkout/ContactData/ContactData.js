import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import { findAllByDisplayValue } from "@testing-library/react";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Damian Szczygielski",
        address: {
          street: "Test 1",
          zipCode: "12345",
          country: "Poland",
        },
        email: "test@test.pl",
        deliverMethod: "fastest",
      },
    };

    axios
      .post("/orders.json", orderData) //This is only for firebase -> .json on the end of endpoint
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => this.setState({ loading: findAllByDisplayValue }));
  };

  render() {
    let form = (
      <form>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className={styles.Input}
        />
        <input
          type="text"
          name="email"
          placeholder="Your email"
          className={styles.Input}
        />
        <input
          type="text"
          name="street"
          placeholder="Your address"
          className={styles.Input}
        />
        <input
          type="text"
          name="postal"
          placeholder="Your post code"
          className={styles.Input}
        />
        <Button buttonType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
