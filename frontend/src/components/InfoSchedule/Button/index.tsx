"use client";

import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
import { GiPowerButton } from "@react-icons/all-files/gi/GiPowerButton";

import styles from "./styles.module.css";

interface ButtonProps {
  onPress: () => void;
  type: 'disable' | 'run'
}

export function Button({ onPress, type }: ButtonProps) {
  return (
    <button
      className={`${styles.btn} ${type === 'disable' ? 'bg-red-700 hover:bg-red-800' : 'bg-green-600 hover:bg-green-700'}`}
      onClick={onPress}
    >
      {type === 'disable' ?
        <GiPowerButton /> : <FaPlay />
      }
    </button>
  )
}