'use client';

import { Input } from '@cric-app/components/ui/input';
import React, { useState, useTransition } from 'react';
import debounce from 'debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cric-app/components/ui/select';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Spinner from '@cric-app/components/ui/spinner';
import { TPlayerType } from '@cric-app/types/players';
import { TYPE_LABELS } from '@cric-app/constants/player';
import Link from 'next/link';
import { Button } from '@cric-app/components/ui/button';

const TYPE_OPTIONS = [
  'batsman',
  'bowler',
  'allRounder',
  'wicketKeeper',
] as TPlayerType[];

function SearchFilters({
  defaultValue,
  defaultType,
}: {
  defaultValue?: string;
  defaultType?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = e.target.value;
    if (!value) {
      current.delete('q');
    } else {
      current.set('q', value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : '';
    if (!isPending)
      startTransition(() => {
        router.push(`${pathname}${query}`);
      });
  };
  const refreshQueryParams = debounce(onChange, 400);

  const [searchValue, setSearchValue] = useState<string>(defaultValue || '');
  const [playerType, setPlayerType] = useState<string>(defaultType || '');

  return (
    <div className="lg:w-2/3 md:w-full flex gap-2 items-center justify-end">
      <div className="flex flex-2">
        <Select
          onValueChange={(value) => {
            const current = new URLSearchParams(
              Array.from(searchParams.entries())
            );

            if (value === 'All') {
              current.delete('type');
            } else {
              current.set('type', value);
            }
            const search = current.toString();
            const query = search ? `?${search}` : '';
            startTransition(() => {
              router.push(`${pathname}${query}`);
            });
            setPlayerType(value);
          }}
          value={playerType}
        >
          <SelectTrigger
            aria-label="Player type"
            className="rounded-r-none w-auto"
          >
            <SelectValue placeholder="Player type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TYPE_OPTIONS.map((type) => (
                <SelectItem aria-label={type} key={type} value={type}>
                  {TYPE_LABELS[type]}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="relative flex items-center flex-1">
          <Input
            placeholder="Search a name"
            value={searchValue}
            onChange={(ev) => {
              setSearchValue(ev.target.value);
              refreshQueryParams(ev);
            }}
            className="rounded-l-none"
          />
          <div className="absolute right-[8px] bg-background p-2">
            {isPending ? <Spinner /> : <MagnifyingGlassIcon />}
          </div>
        </div>
      </div>
      <div>
        <Link
          href={'/cricketers'}
          onClick={() => {
            setSearchValue('');
            setPlayerType('');
          }}
        >
          <Button variant={'ghost'}>Clear all</Button>
        </Link>
      </div>
    </div>
  );
}

export default SearchFilters;
