import { Button } from '@cric-app/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense } from 'react';

import RecommendationsSkeleton from '@cric-app/components/skeletons/recommendations';
import PlayerDetailSkeleton from '@cric-app/components/skeletons/player-detail';
import Recommendations from '@cric-app/composables/cricketer-details-page/recommendations';
import PlayerDetail from '@cric-app/composables/cricketer-details-page/player-detail';

function Page({ params }: { params: Record<string, string> }) {
  return <PlayerDetail pid={params?.cid} />;
}

export default Page;
