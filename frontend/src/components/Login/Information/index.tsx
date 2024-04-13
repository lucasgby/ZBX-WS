import Image from "next/image";

import zbxlogo from "@/assets/zbx-logo2.png";

import { IoLogoWhatsapp } from "@react-icons/all-files/io/IoLogoWhatsapp";

import { services } from "@/components/Login/services";

import styles from "./styles.module.css";

export function Information() {
  return (
    <div
      className={styles['content-info']}>
      <div
        className={styles['inner-content']}>

        <p className={styles.title}>- ACESSE O N BOT -</p>

        <p className={styles.subtitle}>UM ASSISTENTE ZABBIX NO WHATTSAPP</p>

        <div className={styles['content-description']}>
          <p className="font-medium">
            INTEGRE O SEU SERVIDOR ZABBIX E RECEBA AVISOS PERSONALIZADOS DOS INCIDENTES DIRETAMENTE
            NO SEU WHATSAPP.
          </p>

          <ul className="mt-2 pl-6 list-disc">
            {services.map((value) => (
              <li key={`service-${value.id}`}>{value.description}</li>
            ))}
          </ul>

          <div className={styles['content-logos']}>
            <Image
              src={zbxlogo}
              alt="zabbix-logo"
              height={200}
              width={200}
              className="bg-white"
            />

            <p className="text-3xl">+</p>

            <IoLogoWhatsapp
              className={styles['icon-ws']}
            />
          </div>

        </div>
      </div>
    </div>
  )
}