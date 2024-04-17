import { Router } from "express";

import { scheduleCheckIncidentController } from "../controller/scheduleIncidentZbx";

const scheduleIncidentZBXRoutes = Router();

/* Funcations GET */
scheduleIncidentZBXRoutes.get('/incident_zabbix/schedule/:id', scheduleCheckIncidentController.GET.get_schedule_check_incident);
scheduleIncidentZBXRoutes.post('/incident_zabbix/schedules', scheduleCheckIncidentController.GET.get_all_schedules_check_incident);

/* Funcations CREATE */
scheduleIncidentZBXRoutes.post('/incident_zabbix/schedule/new', scheduleCheckIncidentController.CREATE.create_schedule_check_incident_zabbix);

/* Functions UPDATE */
scheduleIncidentZBXRoutes.put('/incident_zabbix/schedule/active/:id', scheduleCheckIncidentController.UPDATE.active_schedule_incident);
scheduleIncidentZBXRoutes.put('/incident_zabbix/schedule/desable/:id', scheduleCheckIncidentController.UPDATE.desable_schedule_incident);
scheduleIncidentZBXRoutes.put('/incident_zabbix/schedule/update/:id', scheduleCheckIncidentController.UPDATE.update_interval_schedule_incident);

/* Functions DELETE */
scheduleIncidentZBXRoutes.delete('/incident_zabbix/schedule/delete/:id', scheduleCheckIncidentController.DELETE.delete_schedule_incident_zbx);

export { scheduleIncidentZBXRoutes };