import { ReactNode } from "react";

import { PathnamePage } from "./Pathname";

import styles from "./styles.module.css";

interface ContentLayoutProps {
  children: ReactNode
}

export function ContentLayout({ children }: ContentLayoutProps) {

  return (
    <div className={styles.container}>
      <PathnamePage />

      <div className={styles['inner-container']}>
        {children}
      </div>
    </div>
  )
}