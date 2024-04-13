"use client"

import { BiChevronLeft } from "@react-icons/all-files/bi/BiChevronLeft";
import { BiChevronRight } from "@react-icons/all-files/bi/BiChevronRight";

import styles from "./styles.module.css";

export interface CloseSidBarProps {
  isCollapsed: boolean;
  onPress: () => void;
}

export function CloseSidBar({ isCollapsed, onPress }: CloseSidBarProps) {

  return (
    <button
      className={styles.container}
      onClick={onPress}
    >
      {isCollapsed ? <BiChevronLeft/> : <BiChevronRight/> }
    </button>
  );
}