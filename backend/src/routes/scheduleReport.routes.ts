import { Router } from "express";

import { scheduleReportController } from "../controller/schedule_report/";
import { can } from "../middlewares/permission";
import { RolesType } from "../model/roles";

const scheduleReportRoutes = Router();

/* Functions Create */
scheduleReportRoutes.post('/schedule/crete',  can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), scheduleReportController.CREATE.create_new_schedule);

/* Functions GET */
scheduleReportRoutes.post('/schedules', can([RolesType.ADMIN, RolesType.USER_READ, RolesType.SUPER_ADMIN]), scheduleReportController.GET.get_all_schedule);

/* Functions Delete */
scheduleReportRoutes.delete('/schedule/delete/:id', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), scheduleReportController.DELETE.delete_shedule);

/* Functions UPDATE */
scheduleReportRoutes.put('/schedule/update/:id', can([RolesType.ADMIN, RolesType.SUPER_ADMIN]), scheduleReportController.UPDATE.alter_status_schedule);

export { scheduleReportRoutes };