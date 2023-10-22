'use client';

import { Input } from '@cric-app/components/ui/input';
import React, { useTransition } from 'react';
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

const TYPE_OPTIONS = [
  'batsman',
  'bowler',
  'allRounder',
  'wicketKeeper',
] as TPlayerType[];

function SearchInput({
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
    startTransition(() => {
      router.push(`${pathname}${query}`);
    });
  };
  const refreshQueryParams = debounce(onChange, 200);
  return (
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
        }}
        defaultValue={defaultType}
      >
        <SelectTrigger className="rounded-r-none w-auto">
          <SelectValue placeholder="Player type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {TYPE_OPTIONS.map((type) => (
              <SelectItem key={type} value={type}>
                {TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="relative flex items-center flex-1">
        <Input
          placeholder="Search a name"
          defaultValue={defaultValue}
          onChange={refreshQueryParams}
          className="rounded-l-none"
        />
        <div className="absolute right-[8px] bg-background p-2">
          {isPending ? <Spinner /> : <MagnifyingGlassIcon />}
        </div>
      </div>
    </div>
  );
}

export default SearchInput;
