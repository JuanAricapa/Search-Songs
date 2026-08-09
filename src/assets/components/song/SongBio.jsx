import React from "react";
import styles from "./songBio.module.css";
import img from "../../img/photo.png";

export function SongBio({ data }) {
  return (
    <section className={styles.container}>
      <figure>
        <img src={data.img ? data.img : img} alt={data.name || "artist"} />
        <figcaption>
          <h2>{data.name}</h2>
          <dl>
            {data.place && (
              <>
                <dt>Place:</dt>
                <dd>{data.place}</dd>
              </>
            )}
            {data.born && (
              <>
                <dt>Born:</dt>
                <dd>{data.born}</dd>
              </>
            )}
            {data.death && (
              <>
                <dt>Death:</dt>
                <dd>{data.death}</dd>
              </>
            )}
            {data.gender && (
              <>
                <dt>Gender:</dt>
                <dd>{data.gender}</dd>
              </>
            )}
            {data.genre && (
              <>
                <dt>Genre:</dt>
                <dd>{data.genre}</dd>
              </>
            )}
          </dl>
          {data.bio && <p className={styles.bio}>{data.bio}</p>}
        </figcaption>
      </figure>
    </section>
  );
}
