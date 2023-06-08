import React from "react";
import styles from "../css/Display.module.css";

const Display = ({ result, operation, number, number2 }) => {

  function formatNumber(num) {
    if(num === "") {
      return "";
    }
    if(num.toString().length >= 19) {
      return num.toExponential(2);
    }
    if(num.toString().split(".")[1] === "00") {
      return num.toString().split(".")[0];
    }
    if(num.toString().split(".")[1] === undefined) {
      return num;
    }
    if(num.toString().split(".")[1].length > 6) {
      return num.toFixed(6) + "..."
    }
  }


  return (
    <div className={styles.display}>
      <div className={styles.operation}>
        {number} <span className={styles.operador}> {operation} </span> {number2}
      </div>
      <div className={result.toString().length > 13 ? styles.resultSmall : result.toString().length > 9 ? styles.resultMedium : styles.resultLarge}> {formatNumber(result)} </div> {/* 20 caracteres */}  
    </div>
  );
};

export default Display;
