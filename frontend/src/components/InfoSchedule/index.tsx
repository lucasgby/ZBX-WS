"use client";

import { subString } from "@/utils/reducerText";
import { Button } from "./Button";
import { Time } from "./Time";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import styles from "./styles.module.css";

interface InfoScheduleProps {
  title: string;
  hour: number;
  minute: number;
  day: number;
  is_active: boolean
}

export function InfoSchedule({ title, day, hour, minute, is_active }: InfoScheduleProps) {
  return (
    <div className={`${styles.container} ${is_active ? 'border-green-700' : 'border-red-700'}`}>
      <p className={`${styles.title} ${is_active ? 'text-green-700' : 'text-red-700'}`}>
        {title.length > 17 ? `${subString(title, 14)}...` : title}
      </p>

      <div className={styles['content-btn-actions']}>
        <button className={`${styles['btn-actions']} bg-red-700`}
        onClick={() => console.log("te")}>
          <MdDelete />
        </button>

        <button className={`${styles['btn-actions']} bg-yellow-700`}>
          <MdModeEdit />
        </button>
      </div>

      <Time
        day={day}
        hour={hour}
        minute={minute}
      />

      <p className={`${styles.status} ${is_active ? 'text-green-600' : 'text-red-700'}`}>
        Status: {is_active ? 'ativo' : 'desativado'}
      </p>

      <div className={styles['content-btn']}>
        <Button
          onPress={() => console.log("")}
          type={is_active ? "disable" : "run"}
        />
      </div>
    </div>
  )
}