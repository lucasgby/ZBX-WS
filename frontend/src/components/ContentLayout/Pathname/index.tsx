"use client";

import { usePathname } from 'next/navigation';

import styles from "./styles.module.css";

export function PathnamePage() {
  const pathname = usePathname();

  return (
    <div className={styles['pathname-styles']}>
      {pathname}
    </div>
  )
}