import React from "react";
import styles from "../css/Display.module.css";

const Display = ({ result, operation, number, number2 }) => {
  return (
    <div className={styles.display}>
      <div className={styles.operation}>
        {number} <span className={styles.operador}> {operation} </span> {number2}
      </div>
      <div className={styles.result}>{result}</div>
    </div>
  );
};

export default Display;
