import React from "react";
import Button from "./Button";
import styles from "../css/Board.module.css";

const Board = ({ setResult, setOperation, setNumber, setNumber2, number, number2, operation, result }) => {
  const datos = [
    { color: "g", dato: "AC" },
    { color: "g", dato: "⭮" },
    { color: "g", dato: "+/-" },
    { color: "g", dato: "%" },
    { color: "r", dato: "+" },
    { color: "r", dato: "-" },
    { color: "r", dato: "x" },
    { color: "r", dato: "÷" },
    { color: "w", dato: "•" },
    { color: "w", dato: "=" },
  ];

  const handleClick = (e) => {
    const dato = e.target.textContent;
    if (dato.trim() === "AC") {
      setResult("");
      setOperation("");
      setNumber("");
      setNumber2("");
    } else if (dato.trim() === "+/-") {
      if (number !== "") {
        setNumber(number * -1);
      } else if (number2 !== "") {
        setNumber2(number2 * -1);
      }
    } else if (dato.trim() === "%") {
      if (number !== "") {
        setNumber(number.trim() / 100);
      } else if (number2 !== "") {
        setNumber2(number2.trim() / 100);
      }
    } else if (dato.trim() === "÷") {
      if(result !== "") {
        setNumber(result.toString());
        setNumber2("");
        setResult("");
      }
      setOperation("÷");
    } else if (dato.trim() === "x") {
      if(result !== "") {
        setNumber(result.toString());
        setNumber2("");
        setResult("");
      }
      setOperation("x");
    } else if (dato.trim() === "-") {
      if(result !== "") {
        setNumber(result.toString());
        setNumber2("");
        setResult("");
      }
      setOperation("-");
    } else if (dato.trim() === "+") {
      if(result !== "") {
        setNumber(result.toString());
        setNumber2("");
        setResult("");
      }
      setOperation("+");
    } else if (dato.trim() === "=") {
      if (operation === "÷") {
        console.log(number, number2);
        setResult(parseFloat(number) / parseFloat(number2));
      } else if (operation === "x") {
        console.log(number, number2);
        setResult(parseFloat(number) * parseFloat(number2));
      } else if (operation === "-") {
        console.log(number, number2);
        setResult(parseFloat(number) - parseFloat(number2));
      } else if (operation === "+") {
        console.log(number, number2);
        setResult(parseFloat(number) + parseFloat(number2));
      }
    } else if (dato.trim() === "⭮") {
      if(number2 !== "") {
        setNumber2((prev) => prev.slice(0, -1));
      }else if (operation !== "") {
        setOperation("");
      }else if(number !== "") {
        setNumber((prev) => prev.slice(0, -1));
      }
    } else if (dato.trim() === "•") {
      if(operation === "") {
        setNumber((prev) => prev.includes(".") ? prev : prev === "" ? "0." : prev + ".");
      } else {
        setNumber2((prev) => prev.includes(".") ? prev : prev === "" ? "0." : prev + ".");
      }
    } else {
      if (operation === "") {
        setNumber((prev) => prev.toString().length > 21 ? prev : prev + dato.trim());
      } else {
        setNumber2((prev) => prev.toString().length > 21 ? prev : prev + dato.trim());
      }
    }
  };

  return (
    <div className={styles.board}>
      {datos.map((e, i) => (
        <Button key={i} color={e.color} dato={e.dato} handleClick={handleClick} />
      ))}
    </div>
  );
};

export default Board;
