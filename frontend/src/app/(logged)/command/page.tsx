"use client";

import { ContentTable } from "@/components";

import { useCommand } from "@/hooks/useCommand";

import { columnsTableCommand } from "@/model/command";

export default function Command() {
  const { data, isLoading } = useCommand();

  return (
    <ContentTable.root>
      <ContentTable.title description="LISTA DE COMANDOS DISPONÍVEIS" />

      <ContentTable.table
        columnsTable={columnsTableCommand}
        data={data?.result ?? []}
        isLoading={isLoading}
      />
    </ContentTable.root>
  )
}