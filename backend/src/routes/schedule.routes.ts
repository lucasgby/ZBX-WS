import { Router } from "express";
import { create_new_schedule, alter_status_schedule, delete_shedule, get_all_schedule } from "../controller/schedule/scheduleController";

const scheduleRoutes = Router();

scheduleRoutes.get('/schedules', get_all_schedule);

scheduleRoutes.delete('/schedule/delete/:id', delete_shedule);

scheduleRoutes.put('/schedule/update/:id', alter_status_schedule);

scheduleRoutes.post('/schedule/crete', create_new_schedule);

export { scheduleRoutes };