import { ReactNode } from "react";
import styles from "./styles.module.css";

interface RootProps {
  children: ReactNode
}

export function Root({ children }: RootProps) {
  return (
    <div className={styles.content}>
      {children}
    </div>
  )
}