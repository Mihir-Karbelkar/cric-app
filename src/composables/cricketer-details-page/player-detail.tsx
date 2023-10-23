import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@cric-app/components/ui/card';
import { TYPE_LABELS } from '@cric-app/constants/player';
import { api } from '@cric-app/lib/api';
import { epochToJsDate, getAge } from '@cric-app/lib/utils';
import { TGetReponsePlayer, TPlayerType } from '@cric-app/types/players';
import { redirect } from 'next/navigation';

const PlayerDetail = async ({ pid }: { pid: string }) => {
  let player;
  try {
    const response = await api(`/api/cricketers/${pid}`);
    if (response.status === 500) {
      throw new Error('Error');
    }

    player = ((await response.json()) as TGetReponsePlayer).player;
  } catch (e) {
    throw new Error('Something went wrong!');
  }
  if (!player) {
    redirect('/cricketers');
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="mb-2 text-2xl">{player?.name}</CardTitle>
        <CardDescription className="text-lg">
          {player?.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
          <div>
            <div className="text-xl font-bold">Type</div>
            <div className="text-sm text-muted-foreground">
              {TYPE_LABELS?.[player?.type as TPlayerType] || '-'}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">Born</div>
            <div className="text-sm text-muted-foreground">
              {player?.dob ? epochToJsDate(player?.dob) : '-'}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">Points</div>
            <div className="text-sm text-muted-foreground">
              {player?.points || '-'}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">Rank</div>
            <div className="text-sm text-muted-foreground">
              {player?.rank || '-'}
            </div>
          </div>
          <div>
            <div className="text-xl font-bold">Age</div>
            <div className="text-sm text-muted-foreground">
              {player?.dob ? getAge(player?.dob) : '-'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDetail;
