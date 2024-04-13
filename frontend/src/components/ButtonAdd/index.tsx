"use client";

import styles from "./styles.module.css";

interface ButtonAddProps {
  description: string;
  onPress: () => void;
}

export function ButtonAdd({ description, onPress }: ButtonAddProps) {
  return (
    <button className={styles.btn} onClick={onPress}>
      {description}
    </button>
  )
}