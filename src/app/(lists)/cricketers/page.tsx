import React, { Fragment, Suspense } from 'react';
import SearchFilters from '../../../composables/cricketers-listing-page/search-input';
import SkeletonTable from '@cric-app/components/skeletons/data-table';

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
        <SearchFilters
          defaultValue={searchParams?.['q']}
          defaultType={searchParams?.['type'] || ''}
        />
      </div>
      <Suspense fallback={<SkeletonTable />}>
        <Results searchParams={searchParams} key={queryParamKey} />
      </Suspense>
    </Fragment>
  );
}
