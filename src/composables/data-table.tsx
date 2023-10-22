'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@cric-app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cric-app/components/ui/select';
import React, {
  TransitionStartFunction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import {
  DataTableProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@cric-app/components/ui/table';
import type {
  InitialTableState,
  PaginationState,
  Table as ReactTableType,
} from '@tanstack/react-table';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Skeleton } from '@cric-app/components/ui/skeleton';
interface DataTablePaginationProps<TData> {
  table: ReactTableType<TData>;
  onPageChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
}
export function DataTable<TData, TValue>({
  columns,
  data,
  initialTableState,
  enableRouting,
  pageCount,
  manualPagination = false,
}: DataTableProps<TData, TValue> & {
  initialTableState?: InitialTableState;
  enableRouting?: boolean;
  pageCount?: number;
  manualPagination?: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>(
    initialTableState?.sorting || []
  );
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialTableState?.pagination?.pageIndex || 0,
    pageSize: initialTableState?.pagination?.pageSize || 10,
  });
  const [isPending, startTransition] = useTransition();

  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
    pageCount,
    manualPagination,
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : enableRouting &&
                        header.column.columnDef.enableSorting ? (
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            const current = new URLSearchParams(
                              Array.from(searchParams.entries())
                            );
                            current.set(
                              'sorting',
                              JSON.stringify([
                                {
                                  desc: header.column.getIsSorted() === 'asc',
                                  id: header.column.id,
                                },
                              ])
                            );
                            const search = current.toString();
                            const query = search ? `?${search}` : '';
                            startTransition(() => {
                              router.push(`${pathname}${query}`);
                            });
                          }}
                          href={'#'}
                          shallow
                        >
                          {' '}
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Link>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={isPending ? 'animate-pulse' : ''}>
            {isPending ? (
              Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((cell) => (
                    <TableCell key={cell.id}>
                      <Skeleton className="h-4 w-full rounded-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) =>
                    isPending ? (
                      <TableCell key={cell.id}>
                        <Skeleton className="h-4 w-full rounded-full" />
                      </TableCell>
                    ) : (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination
          table={table}
          onPageChange={(_pagination) => {
            const current = new URLSearchParams(
              Array.from(searchParams.entries())
            );
            current.set('pg', _pagination.pageIndex.toString());
            current.set('size', _pagination.pageSize.toString());
            const search = current.toString();
            const query = search ? `?${search}` : '';
            startTransition(() => {
              router.replace(`${pathname}${query}`);
            });
          }}
        />
      </div>
    </div>
  );
}
export function DataTablePagination<TData>({
  table,
  onPageChange = () => undefined,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t">
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center md:space-x-6 lg:space-x-8 flex-wrap space-x-0 gap-2">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              onPageChange({
                pageIndex: 0,
                pageSize: Number(value),
              });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(0);
                onPageChange({
                  pageIndex: 0,
                  pageSize: table.getState().pagination.pageSize,
                });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <DoubleArrowLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                table.previousPage();
                if (table.getCanPreviousPage())
                  onPageChange({
                    pageIndex: table.getState().pagination.pageIndex - 1,
                    pageSize: table.getState().pagination.pageSize,
                  });
              }}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                table.nextPage();
                if (table.getCanNextPage())
                  onPageChange({
                    pageIndex: table.getState().pagination.pageIndex + 1,
                    pageSize: table.getState().pagination.pageSize,
                  });
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                table.setPageIndex(table.getPageCount() - 1);
                onPageChange({
                  pageIndex: table.getPageCount() - 1,
                  pageSize: table.getState().pagination.pageSize,
                });
              }}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <DoubleArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
