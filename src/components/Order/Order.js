import React from "react";
import styles from "./Order.module.css";

const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientsOutput = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ingredient.name} ({ingredient.amount})
      </span>
    );
  });

  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)} PLN</strong>
      </p>
    </div>
  );
};

export default order;
