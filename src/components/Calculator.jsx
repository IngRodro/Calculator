import React from "react";
import Board from "./Board";
import styles from "../css/Calculator.module.css";
import Display from "./Display";

const Calculator = () => {
  const [result, setResult] = React.useState(0);
  const [operation, setOperation] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [number2, setNumber2] = React.useState("");

  return (
    <div className={styles.calculator}>
      <Display result={result} operation={operation} number={number} number2={number2} />
      <Board setResult={setResult} setOperation={setOperation} setNumber={setNumber} setNumber2={setNumber2}  number={number} number2={number2} operation={operation} />
    </div>
  );
};

export default Calculator;
