import { ReactNode } from "react";

import { Header } from "../Header";
import { Dashboard } from "../CardDashboard";

import styles from "./styles.module.css";

interface InnerContainerProps {
  children: ReactNode
}

export function InnerContainer() {
  return (
    <div className={styles.container}>
      {/*<Header />*/}

      <div className={styles.content}>
        <Dashboard.Root>
          <Dashboard.Header />

          <Dashboard.Information />
        </Dashboard.Root>

        <Dashboard.Card />
      </div>
    </div>
  )
}