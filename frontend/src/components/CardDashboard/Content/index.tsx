import { ReactNode } from "react";

import styles from "./styles.module.css";

interface Content{
  children: ReactNode;
}

export function Content({ children }: Content) {
  return(
    <div className={styles.container}>
      {children}
    </div>
  )
}