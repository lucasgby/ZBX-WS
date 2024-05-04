import { Router } from "express";

import { scheduleCheckIncidentController } from "../controller/scheduleIncidentZbx";
import { can } from "../middlewares/permission";
import { RolesType } from "../model/roles";

const scheduleIncidentZBXRoutes = Router();

/* Funcations GET */
scheduleIncidentZBXRoutes.get('/incident_zabbix/schedule/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), scheduleCheckIncidentController.GET.get_schedule_check_incident);
scheduleIncidentZBXRoutes.post('/incident_zabbix/schedules', can([RolesType.SUPER_ADMIN, RolesType.ADMIN, RolesType.USER_READ]), scheduleCheckIncidentController.GET.get_all_schedules_check_incident);

/* Funcations CREATE */
scheduleIncidentZBXRoutes.post('/incident_zabbix/schedule/new', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), scheduleCheckIncidentController.CREATE.create_schedule_check_incident_zabbix);

/* Functions UPDATE */
scheduleIncidentZBXRoutes.put('/incident_zabbix/schedule/active/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), scheduleCheckIncidentController.UPDATE.active_schedule_incident);
scheduleIncidentZBXRoutes.put('/incident_zabbix/schedule/desable/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), scheduleCheckIncidentController.UPDATE.desable_schedule_incident);
scheduleIncidentZBXRoutes.put('/incident_zabbix/schedule/update/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), scheduleCheckIncidentController.UPDATE.update_interval_schedule_incident);

/* Functions DELETE */
scheduleIncidentZBXRoutes.delete('/incident_zabbix/schedule/delete/:id', can([RolesType.SUPER_ADMIN, RolesType.ADMIN]), scheduleCheckIncidentController.DELETE.delete_schedule_incident_zbx);

export { scheduleIncidentZBXRoutes };