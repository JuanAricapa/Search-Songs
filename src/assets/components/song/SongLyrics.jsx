import React from "react";
import styles from "./songLyrics.module.css";

export function SongLyrics({ data }) {
  return (
    <div className={styles.container} style={{ whiteSpace: "pre-wrap" }}>
      <h3>Letra de la canción</h3>
      <p>{data}</p>
    </div>
  );
}
