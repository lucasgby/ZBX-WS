import { TableComponent } from "@/components";
import { useDataTable } from "@/hooks/useDataTable";

interface TableProps<T> {
  columnsTable: { key: string, label: string }[],
  isLoading: boolean,
  data: T[],
}

export function Table<T>(dataTable: TableProps<T>) {
  const { setSortDescriptor, sortDescriptor, sortedItems } = useDataTable({ list: dataTable.data});

  return (
    <TableComponent
      columnsTable={dataTable.columnsTable}
      data={sortedItems}
      isLoading={dataTable.isLoading}
      onSortChange={setSortDescriptor}
      sortDescriptor={sortDescriptor}
    />
  )
}