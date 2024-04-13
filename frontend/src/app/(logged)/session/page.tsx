"use client";

import { IoLogoWhatsapp } from "@react-icons/all-files/io/IoLogoWhatsapp";
import { MdPhoneIphone } from "@react-icons/all-files/md/MdPhoneIphone";

import { useConnectController } from "@/controller/connect"
import { QrCode } from "./components/qrcode";

import styles from "./styles.module.css";

export default function Session() {
  return (
    <div className="m-4">
      <p className="font-semibold mt-2">CONEXÕES</p>

      <div className={styles['content-connection']}>
        <IoLogoWhatsapp className="text-20" />

        <p className="text-sm">Whatapp</p>
      </div>

      <div className={styles.status}>
        <div className={styles.description}>
          <IoLogoWhatsapp className="text-green-600" />

          <p className="text-sm font-semibold">87 996813473</p>
        </div>

        <p className="mt-2 text-sm text-green-600">Conectado</p>

        <div className={styles['content-phone']}>
          <MdPhoneIphone />

          <p> 5587996813473</p>
        </div>
      </div>
    </div>
  )
}