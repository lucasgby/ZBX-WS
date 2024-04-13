"use client";

import { useChat } from "@/hooks/useChat";

import { ContentTable } from "@/components";

import { columnsTableChat } from "@/model/chat";

import styles from "./styles.module.css";

export default function Group() {
  const { data, isLoading } = useChat({ page: 1, take: 20 });

  return (
    <ContentTable.root>
      <ContentTable.title description="CHATS ATIVOS" />

      <ContentTable.table
        columnsTable={columnsTableChat}
        isLoading={isLoading}
        data={data?.result ?? []}
      />
    </ContentTable.root>
  )
}