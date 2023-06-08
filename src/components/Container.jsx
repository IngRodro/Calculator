import React from "react";
import styles from "../css/Container.module.css";
import Calculator from "./Calculator";

const Container = () => {
  return (
    <main className={styles.container}>
      <Calculator />
    </main>
  );
};

export default Container;
