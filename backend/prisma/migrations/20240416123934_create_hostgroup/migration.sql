-- CreateTable
CREATE TABLE "hostgroups" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "group_host_id" INTEGER NOT NULL,
    "description" VARCHAR(80) NOT NULL,
    "id_g_ws" TEXT NOT NULL,
    "hostid" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "hostgroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schedule_incidents_zabbix" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seconds_interval" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "organization_id" INTEGER NOT NULL,

    CONSTRAINT "schedule_incidents_zabbix_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hostgroups_group_host_id_key" ON "hostgroups"("group_host_id");

-- CreateIndex
CREATE UNIQUE INDEX "hostgroups_id_g_ws_key" ON "hostgroups"("id_g_ws");

-- CreateIndex
CREATE UNIQUE INDEX "hostgroups_hostid_key" ON "hostgroups"("hostid");

-- CreateIndex
CREATE INDEX "idx_host_group_id" ON "hostgroups"("id");

-- CreateIndex
CREATE INDEX "idx_host_group_grouphostid" ON "hostgroups"("group_host_id");

-- CreateIndex
CREATE INDEX "idx_host_group_id_ws" ON "hostgroups"("hostid");

-- CreateIndex
CREATE INDEX "idx_schdule_incident_zabbix_id" ON "schedule_incidents_zabbix"("id");

-- AddForeignKey
ALTER TABLE "hostgroups" ADD CONSTRAINT "hostgroups_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule_incidents_zabbix" ADD CONSTRAINT "schedule_incidents_zabbix_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
