import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, I'm Bri! </h1>
        <p className={styles.description}>
          I'm a Junior Software Developer and Graphic Designer with a passion for creating stlylish
          and functional web applications.
        </p>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
        className={styles.contactBtn}>
          My Resume
        </a>
      </div>
      <img
        src={getImageUrl("hero/laptop.png")}
        alt="Hero image"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
