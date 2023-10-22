import React, { Suspense } from 'react';
import RecommendationsSkeleton from '@cric-app/components/skeletons/recommendations';
import PlayerDetailSkeleton from '@cric-app/components/skeletons/player-detail';
import Recommendations from '@cric-app/composables/cricketer-details-page/recommendations';
import PlayerDetail from '@cric-app/composables/cricketer-details-page/player-detail';
import { Button } from '@cric-app/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

function Layout({
  children,
  details,
  recommendations,
}: {
  children: React.ReactNode;
  details: React.ReactNode;
  recommendations: React.ReactNode;
}) {
  return (
    <div className="flex justify-center flex-col ">
      <div className="mt-4">
        <Link href="/cricketers">
          <Button variant={'secondary'}>
            <ArrowLeftIcon /> Back to Cricketers
          </Button>
        </Link>
      </div>
      {children}

      <div className="mt-4">
        <div className="text-2xl font-bold mb-4">Player Details</div>
        {details}
      </div>
      <div className="mt-4">
        <span className="text-2xl font-bold">Recommendations</span>
        {recommendations}
      </div>
    </div>
  );
}

export default Layout;
