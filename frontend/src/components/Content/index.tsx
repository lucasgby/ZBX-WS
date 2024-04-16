import { ReactNode } from "react";

import styles from "./styles.module.css";


interface ContentProps {
  children: ReactNode
}

export function Content({ children }: ContentProps) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}