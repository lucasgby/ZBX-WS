import { Information } from "@/components/Login/Information";

import { ContentFormLogin } from "./ContentFormLogin";

import styles from "./styles.module.css";

export function Login() {
  return (
    <div className={styles.container}>
      <Information/>

      <ContentFormLogin />
    </div>
  )
}