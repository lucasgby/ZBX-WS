import styles from "./styles.module.css";

interface TitleProps {
  description: string
}

export function Title({ description }: TitleProps) {
  return (
    <div
      className={styles.title}>
      {description}
    </div>
  )
}