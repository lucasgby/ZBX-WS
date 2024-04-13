import styles from "./styles.module.css";

export function Header() {
  return (
    <div
      key={'user?.id'}
      className={`content-gradient ${styles['container-header']}`}
    >
      <div className={styles['content-information']}>
        <p key={"admin"} className={styles.title}>
          N BOT
        </p>

        <span
          key={'entity?.cnpj'}
          className={styles['text-cnpj']}>
          
          VIDATEL TELECOM
        </span>

        {/*<ButtonLogout />*/}
      </div>
    </div>
  )
}