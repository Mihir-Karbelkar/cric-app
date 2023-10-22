import React, { Fragment, Suspense } from 'react';
import SearchInput from '../../../composables/cricketers-listing-page/search-input';
import SkeletonTable from '@cric-app/components/skeletons/data-table';

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
