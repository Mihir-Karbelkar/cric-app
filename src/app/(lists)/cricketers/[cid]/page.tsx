import { Button } from '@cric-app/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';

import RecommendationsSkeleton from '@cric-app/components/skeletons/recommendations';
import PlayerDetailSkeleton from '@cric-app/components/skeletons/player-detail';
import Recommendations from '@cric-app/composables/cricketer-details-page/recommendations';
import PlayerDetail from '@cric-app/composables/cricketer-details-page/player-detail';

function Page({ params }: { params: Record<string, string> }) {
  return (
    <div className="mt-4">
      <Link href="/cricketers">
        <Button variant={'secondary'}>
          <ArrowLeftIcon /> Back to Cricketers
        </Button>
      </Link>
      <div className="mt-4">
        <div className="text-2xl font-bold mb-4">Player Details</div>

        <Suspense fallback={<PlayerDetailSkeleton />}>
          <PlayerDetail pid={params?.cid} />
        </Suspense>
      </div>
      <div className="mt-4">
        <span className="text-2xl font-bold">Recommendations</span>
        <Suspense fallback={<RecommendationsSkeleton />}>
          <Recommendations pid={params?.cid} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
