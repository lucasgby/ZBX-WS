"use client";

import { ButtonAdd, ContentTable, InfoSchedule, ModalForm } from "@/components";
import { useModal } from "@/hooks/useModal";
import { useSchemaValidade } from "@/hooks/useSchemaValidade";
import { scheduleSchema, ScheduleSchema } from "@/model/formShema/scheduleShema";
import { inputOptions } from "@/model/inputRegister/shedule";
import { useSchedule } from "@/hooks/useSchedule";

import styles from "./styles.module.css";

export default function Agend() {
  const { isOpen, onOpen, onOpenChange } = useModal();
  const scheduleMethods = useSchemaValidade<ScheduleSchema>( { schemaYup: scheduleSchema } );

  return (
    <div className={styles.container}>

      <ContentTable.title description="AGENDAMENTOS DOS RELATÓRIOS" />

      <ButtonAdd description="+ CRIAR AGENDAMENTO" onPress={onOpen}/>
      
      <ModalForm<ScheduleSchema>
        isOpen={isOpen}
        listForm={inputOptions()}
        onOpenChange={onOpenChange}
        titleModal="CRIAR AGENDAMENTO"
        useFormMethods={scheduleMethods}
        sendForm={() => console.log("envie")}
        backdrop="opaque"
      />

      <div className={styles.content}>
        <InfoSchedule
          title="RELATÓRIO SEMANAL"
          day={2}
          hour={9}
          minute={0}
          is_active={true}
        />
      </div>

    </div>
  )
}