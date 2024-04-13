"use client";

import { useMemo, useState } from "react";
import { SortDescriptor } from "@nextui-org/react";

interface DataTableProps<T> {
  list: T[]
}

export function useDataTable<T>({ list }: DataTableProps<T>) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const sortedItems = useMemo(() => {
    return [...list].sort((a: T, b: T) => {
      const first = a[sortDescriptor.column as keyof T] as number;
      const second = b[sortDescriptor.column as keyof T] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, list]);

  return {
    sortedItems,
    setSortDescriptor,
    sortDescriptor
  }
}