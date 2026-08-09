import React from "react";
import styles from "./error.module.css";

export function ErrorComponent({ error }) {
  return (
    <p className={styles.error}>Ha ocurrido un error inesperado: {error}</p>
  );
}
