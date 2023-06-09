import React from "react";
import Board from "./Board";
import styles from "../css/Calculator.module.css";
import Display from "./Display";
import Canvas from "./Canvas";

const Calculator = () => {
  const [result, setResult] = React.useState("");
  const [operation, setOperation] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [number2, setNumber2] = React.useState("");

  return (
    <div className={styles["app-container"]}>
      <div className={styles["canvas-container"]}>
        <Canvas setNumber={setNumber} setNumber2={setNumber2} operation={operation}/>
      </div>
      <div className={styles.calculator}>
        <Display result={result} operation={operation} number={number} number2={number2} />
        <Board setResult={setResult} setOperation={setOperation} setNumber={setNumber} setNumber2={setNumber2}  number={number} number2={number2} operation={operation} result={result} />
      </div>
    </div>
  );
};

export default Calculator;
