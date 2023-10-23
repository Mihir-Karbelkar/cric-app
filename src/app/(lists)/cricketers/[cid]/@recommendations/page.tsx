import React from 'react';

import Recommendations from '@cric-app/composables/cricketer-details-page/recommendations';

function Page({ params }: { params: Record<string, string> }) {
  return <Recommendations pid={params?.cid} />;
}

export default Page;
