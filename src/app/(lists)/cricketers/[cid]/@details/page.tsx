import React from 'react';

import PlayerDetail from '@cric-app/composables/cricketer-details-page/player-detail';

function Page({ params }: { params: Record<string, string> }) {
  return <PlayerDetail pid={params?.cid} />;
}

export default Page;
