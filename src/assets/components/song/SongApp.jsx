import React, { useState, useEffect } from "react";
import styles from "./songApp.module.css";
import { SongBio } from "./SongBio";
import { SongLyrics } from "./SongLyrics";
import { SongForm } from "./SongForm";
import { Loader } from "./Loader";
import { ajax } from "../../helpers/ajax.js";
import { ErrorComponent } from "./ErrorComponent.jsx";

export function SongApp() {
  const [formData, setFormData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [allData, setAllData] = useState(null);

  const handleFormData = (data) => {
    setFormData(data);
  };

  useEffect(() => {
    if (!formData) return;

    const getData = async () => {
      setLoader(true);
      setError(null);
      setAllData(null);

      let artistData = null;
      let lyricsData = null;
      let hasAjaxError = false;

      const artistURL = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${formData.artist}`;
      const lyricsURL = `https://api.lyrics.ovh/v1/${formData.artist}/${formData.song}`;

      try {
        const [artistRes, lyricsRes] = await Promise.allSettled([
          ajax(artistURL),
          ajax(lyricsURL),
        ]);

        if (lyricsRes.status === "fulfilled") {
          lyricsData = lyricsRes.value.lyrics;
        } else {
          lyricsData = `No se ha encontrado la canción "${formData.song}"`;
        }

        if (artistRes.status === "fulfilled") {
          if (artistRes.value.artists) {
            const s = artistRes.value.artists[0];
            artistData = {
              name: s.strArtist,
              img: s.strArtistThumb,
              bio: s.strBiographyEN,
              place: s.strCountry,
              gender: s.strGender,
              genre: s.strGenre,
              born: s.intBornYear,
              death: s.intDiedYear,
            };
          } else {
            artistData = `No se ha encontrado el intérprete "${formData.artist}"`;
          }
        } else {
          hasAjaxError = true;
          artistData = `No se ha encontrado el intérprete "${formData.artist}"`;
        }

        if (hasAjaxError) {
          setError("Una o más peticiones fallaron.");
        }

        setAllData({ artistData, lyricsData });
      } catch (err) {
        setError("Error inesperado en la aplicación.");
      } finally {
        setLoader(false);
      }
    };

    getData();
  }, [formData]);

  return (
    <section className={styles.songSectionContainer}>
      <h1>Search the information about your favorite song and artist</h1>
      <SongForm handleFormData={handleFormData}></SongForm>
      {error && <ErrorComponent error={error} />}

      {allData && (
        <div className={styles.songSectionGrid}>
          {allData && (
            <>
              {allData.lyricsData && <SongLyrics data={allData.lyricsData} />}

              {allData.artistData && <SongBio data={allData.artistData} />}
            </>
          )}
        </div>
      )}

      {loader && <Loader></Loader>}
    </section>
  );
}
