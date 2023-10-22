'use client';
import Link from '@cric-app/components/ui/link';
import { TYPE_LABELS } from '@cric-app/constants/player';
import { TMayBe, TPlayer, TPlayerType } from '@cric-app/types/players';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon } from 'lucide-react';

export const getAge = (dob: number) => {
  const now = new Date();
  const utcMilllisecondsSinceEpoch =
    now.getTime() + now.getTimezoneOffset() * 60 * 1000;

  return Math.floor(
    (utcMilllisecondsSinceEpoch - dob) / (1000 * 60 * 60 * 24 * 365)
  );
};

export const columns: ColumnDef<TMayBe<TPlayer>>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className="flex items-center cursor-pointer"
        >
          Name
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
    cell: ({ row }) => (
      <Link href={`/cricketers/${row.original?.id}`}>{row.original?.name}</Link>
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'type',
    id: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <>{TYPE_LABELS?.[row.original?.type as TPlayerType] || ''}</>
    ),
  },
  {
    accessorKey: 'points',
    id: 'points',
    header: 'Points',
  },
  {
    accessorKey: 'rank',
    id: 'rank',
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className="flex items-center cursor-pointer"
        >
          Rank
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'dob',
    id: 'age',
    cell: ({ row }) => <span>{getAge(row.getValue('age'))}</span>,
    sortingFn: 'datetime',
    header: ({ column }) => {
      return (
        <button
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === 'asc');
          }}
          className="flex items-center cursor-pointer"
        >
          Age
          {column.getIsSorted() === 'asc' ? (
            <ArrowUpIcon className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'desc' ? (
            <ArrowDownIcon className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
    enableSorting: true,
  },
];
