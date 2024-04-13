import styles from "./styles.module.css";

export function Footer() {
  return (
    <div className={`content-gradient ${styles['container-footer']}`}>

      <div className={styles['container-information-left']}>
        Copyright © 2024
        <p className={styles['link']}>
          <a
            href=""
            target="_blank"
            className="font-bold mr-[2px]"
          >
            N3Soft
          </a>
          Todos os Direitos Reservados.
        </p>
      </div>

      <div className={styles['container-information']}>
        Logado como:
        <p className={styles['name-user']}>LUCAS GABRYEL MONTEIRO</p>
      </div>
    </div>
  )
}