import React, { useState } from "react";
import styles from "./songForm.module.css";

const initialFormData = {
  artist: "",
  song: "",
};

export function SongForm({ handleFormData }) {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.artist || !formData.song) {
      alert("faltan datos por llenar.");
      return;
    }

    handleFormData(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form autoComplete="off" className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.gridContainer}>
        <div>
          <label htmlFor="input-artist">Nombre del artista:</label>
          <input
            className={styles.blurEffect}
            type="text"
            name="artist"
            id="input-artist"
            onChange={handleChange}
            value={formData.artist}
          />
        </div>
        <div>
          <label htmlFor="input-song">Nombre de la canción:</label>
          <input
            className={styles.blurEffect}
            type="text"
            name="song"
            id="input-song"
            onChange={handleChange}
            value={formData.song}
          />
        </div>
      </div>
      <div>
        <input
          className={`${styles.inputSubmit}`}
          type="submit"
          value="Buscar"
        />
      </div>
    </form>
  );
}
