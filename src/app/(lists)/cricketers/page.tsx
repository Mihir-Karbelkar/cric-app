import { columns } from '@cric-app/composables/cricketers-table/columns';
import { DataTable } from '@cric-app/composables/data-table';
import { TGetReponsePlayers } from '@cric-app/types/players';
import React, { Fragment, Suspense } from 'react';
import SearchInput from '../../../composables/cricketers-listing-page/search-input';
import SkeletonTable from '@cric-app/components/skeletons/data-table';
import { api } from '@cric-app/lib/api';
import { InitialTableState } from '@tanstack/react-table';
import { Button } from '@cric-app/components/ui/button';
import Link from 'next/link';
import Results from '@cric-app/composables/cricketers-listing-page/results';

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const queryParamKey = JSON.stringify(searchParams);
  return (
    <Fragment>
      <div className="flex justify-end mb-2 mt-4">
        <div className="lg:w-2/3 md:w-full flex gap-2 items-center justify-end">
          <SearchInput
            defaultValue={searchParams?.['q']}
            defaultType={searchParams?.['type'] || ''}
            key={queryParamKey}
          />
          <div>
            <Link href={'/cricketers'}>
              <Button variant={'ghost'}>Clear all</Button>
            </Link>
          </div>
        </div>
      </div>
      <Suspense fallback={<SkeletonTable />}>
        <Results searchParams={searchParams} key={queryParamKey} />
      </Suspense>
    </Fragment>
  );
}
// const Results = async ({
//   searchParams,
// }: {
//   searchParams: Record<string, string>;
// }) => {
//   const urlSearchParams = new URLSearchParams(searchParams);
//   const data = (await (
//     await api(`/api/cricketers?${urlSearchParams}`)
//   ).json()) as TGetReponsePlayers;
//   const players = data.items;
//   const { sorting, pg, size } = searchParams;
//   let initialState: InitialTableState = {
//     pagination: {
//       pageIndex: 0,
//       pageSize: 10,
//     },
//   };
//   if (sorting) {
//     try {
//       initialState = {
//         ...initialState,
//         sorting: JSON.parse(sorting),
//       };
//     } catch {
//       //pass
//     }
//   }

//   if (initialState['pagination']) {
//     initialState['pagination'].pageIndex = parseInt(pg) || 0;
//     initialState['pagination'].pageSize = parseInt(size) || 10;
//     console.log(pg, size, 'SIZE');
//   }

//   return (
//     <DataTable
//       columns={columns}
//       data={players}
//       initialTableState={{ ...initialState }}
//       enableRouting
//       pageCount={data.pageCount}
//       manualPagination
//       key={JSON.stringify(searchParams)}
//     />
//   );
// };
