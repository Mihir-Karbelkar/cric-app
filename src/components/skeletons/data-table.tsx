'use client';
import { DataTable } from '@cric-app/composables/data-table';
import { TMayBe, TPlayer } from '@cric-app/types/players';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
export const columns: ColumnDef<TMayBe<TPlayer>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: () => (
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: () => (
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
    ),
  },
  {
    accessorKey: 'points',
    header: 'Points',
    cell: () => (
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
    ),
  },
  {
    accessorKey: 'rank',
    header: 'Rank',
    cell: () => (
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
    ),
  },
  {
    accessorKey: 'dob',
    id: 'age',
    cell: () => (
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
    ),
    header: 'Age',
  },
];

function SkeletonTable() {
  const players = Array.from({ length: 5 }).map(() => ({}));
  return (
    <div role="status" className=" animate-pulse">
      <DataTable columns={columns} data={players} />
    </div>
  );
}

export default SkeletonTable;
