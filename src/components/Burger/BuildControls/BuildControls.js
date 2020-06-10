import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => (
  <div className={styles.BuildControls}>
    {controls.map((control) => (
      <BuildControl
        key={control.label}
        label={control.label}
        removed={() => props.ingredientRemoved(control.type)}
        added={() => props.ingredientAdded(control.type)}
        disabledInfo={props.disabledInfo[control.type]}
      />
    ))}
  </div>
);

export default buildControls;
