import { Form } from "@/components/Login/Form";
import { Information } from "@/components/Login/Information";

import styles from "./styles.module.css";

export function Login() {
  return (
    <div className={styles.container}>
      <Information/>

      <Form />
    </div>
  )
}