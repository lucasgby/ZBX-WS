import { boolean, number, object } from "yup";

interface CreateScheduleIncident {
  interval: number, 
}

interface UpdateScheduleIncident {
  interval?: number
}

const createScheduleIncident = object().shape({
  interval: number().required("O Campo Interval é Obrigatório"), 
});

const updateScheduleIncident = object().shape({
  interval: number()
});

export { CreateScheduleIncident, UpdateScheduleIncident };
export { createScheduleIncident, updateScheduleIncident };
