"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidbarItems } from "@/model/sidbarItems";

import { CloseSidBar } from "./CloseSidbar";
import { useSidbar } from "@/controller/state/useSidbar";

import styles from "./styles.module.css";
import { subString } from '@/utils/reducerText';

export function Nav() {
  const pathname = usePathname();

  const { handleAlterStatusSidbar, isOpen } = useSidbar();

  return (
    <nav className={`${isOpen ? styles.container : styles['sid-close']}`}>
      <ul className={styles.navigation}>
        {sidbarItems.map((value) => (
          <Link
            key={`item-sidbar-${value.id}`}
            className={`${isOpen ? styles.option : styles['option-close']}`}
            href={value.href}
          >

            {pathname === value.href &&
              <div className={styles['indicate-page']} />
            }

            <span>
              {value.icon}
            </span>

            {isOpen &&
              <span>
                {value.name.length > 10 ? `${subString(value.name, 7)}...` : value.name}
              </span>
            }
          </Link>
        ))}

        <CloseSidBar
          isCollapsed={isOpen}
          onPress={handleAlterStatusSidbar}
        />
      </ul>
    </nav>
  )
}