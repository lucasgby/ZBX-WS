import { FaRegCalendarAlt } from "@react-icons/all-files/fa/FaRegCalendarAlt";
import { RxLapTimer } from "react-icons/rx";

import styles from "./styles.module.css";

interface TimeProps {
  hour: number;
  minute: number;
  day: number
}

function convertionDay(day: number) {
  let dayWeek = '';
  switch (day) {
    case 0:
      dayWeek = 'Domingo'
      break;
    case 1:
      dayWeek = 'Segunda'

      break;
    case 2:
      dayWeek = 'Terça'
      
      break;
    case 3:
      dayWeek = 'Quarta'

      break;
    case 4:
      dayWeek = 'Quinta'

      break;
    case 5:
      dayWeek = 'Sexta'

      break;
    case 6:
      dayWeek = 'Sabado'

      break;
    case 7:
      dayWeek = 'Domingo'

      break;
  }

  return dayWeek;
}

export function Time({ day, hour, minute }: TimeProps) {
  return (
    <div className="p-1 mt-2">
      <button className={styles['btn-time']}>
        <RxLapTimer />
        <p>{hour < 10 ? `0${hour}` : hour}:{minute < 10 ? `0${minute}` : minute}</p>
      </button>

      <button className={styles['btn-time']}>
        <FaRegCalendarAlt />
        <p>{convertionDay(day)}</p>
      </button>
    </div>
  )
}