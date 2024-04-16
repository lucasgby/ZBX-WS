import Image from "next/image";

import nsoftLogo from "@/assets/NZBX_512.png"
import botIcon from "@/assets/bot.png";

import { Form } from "../Form";

import styles from "./styles.module.css";

export function ContentFormLogin() {
  return (
    <div className={`${styles.content} scrollbar-conf`}>
      <Image
        src={nsoftLogo}
        alt="nsoft-log"
        height={60}
      />
      <h1 className={styles.title}>Welcome Back</h1>

      <p className={styles.subtitle}>Bem vindo de volta, Por favor entre com seus dados</p>

      <Form/>

      <button className="self-end mt-1 text-red-600 font-bold">
        Esqueci minha Senha?
      </button>

      <Image
        src={botIcon}
        alt="bot-icon"
        height={80}
        width={80}
        className={styles['icon-bot']}
      />
    </div>
  )
}