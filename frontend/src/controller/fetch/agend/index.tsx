import { useModal } from "@/hooks/useModal";
import { useSchemaValidade } from "@/hooks/useSchemaValidade";
import { ScheduleSchema, scheduleSchema } from "@/model/formShema/scheduleShema";

export function ScheduleController() {
  const { isOpen, onOpen, onOpenChange } = useModal();
  const scheduleMethods = useSchemaValidade<ScheduleSchema>( { schemaYup: scheduleSchema } );
  
  return {

  }
}