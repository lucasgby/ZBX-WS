"use client";

import {
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  getKeyValue, 
  Spinner, 
  SortDescriptor,
} from "@nextui-org/react";

import styles from './styles.module.css';

interface TableComponentProps<T> {
  columnsTable: { key: string, label: string }[],
  isLoading: boolean,
  data: T[],
  sortDescriptor?: SortDescriptor | undefined,
  onSortChange?: (descriptor: SortDescriptor) => void
}

export function TableComponent<T>({ columnsTable, data, isLoading, onSortChange, sortDescriptor }: TableComponentProps<T>) {

  return (
    <Table
      isStriped
      isHeaderSticky
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
      aria-label="List Active Commands"
      shadow="md"
      className={styles['table-container']}
    >
      <TableHeader columns={columnsTable}>
        {(column) => <TableColumn key={column.key} align="start" allowsSorting={column.key !== 'actions' ? true : false}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody
        items={data}
        isLoading={isLoading}
        emptyContent={"No rows to display."}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow>
            {(columnKey) => <TableCell key={`table-cell-${columnKey}`}>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}