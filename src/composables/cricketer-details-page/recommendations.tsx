import { Card, CardTitle, CardDescription } from '@cric-app/components/ui/card';
import { api } from '@cric-app/lib/api';
import {
  TPlayer,
  TGetRecommendedPlayersResponse,
} from '@cric-app/types/players';
import { Avatar, AvatarFallback } from '@cric-app/components/ui/avatar';
import Link from 'next/link';
const getInitials = (name: string) => {
  const names = name.split(' ');
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  if (initials.length > 1) {
    return `${initials[0]}${initials[initials.length - 1]}`;
  } else {
    return initials[0];
  }
};
const RecommendedCard = ({ player }: { player: TPlayer }) => {
  return (
    <Link className="cursor-pointer" href={`/cricketers/${player.id}`}>
      <Card className="p-4 h-full flex gap-4">
        <Avatar>
          <AvatarFallback>{getInitials(player?.name || '')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{player?.name}</CardTitle>
          <CardDescription className="mt-2 line-clamp-3">
            {player.description}
          </CardDescription>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4 mt-auto">
            <div>
              <div className="text-xl font-bold">Points</div>
              <div className="text-sm text-muted-foreground">
                {player?.points || '-'}
              </div>
            </div>{' '}
            <div>
              <div className="text-xl font-bold">Rank</div>
              <div className="text-sm text-muted-foreground">
                {player?.rank || '-'}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
const Recommendations = async ({ pid }: { pid: string }) => {
  let players;
  try {
    const response = await api(`/api/cricketers/${pid}/recommendations`);
    if (response.status === 500) {
      throw new Error('Error');
    }
    players = ((await response.json()) as TGetRecommendedPlayersResponse)
      .players;
  } catch {
    throw new Error('Something went wrong!');
  }
  if (players?.length === 0)
    return <div className="text-xl">No recommendations found!</div>;
  return (
    <div className="mt-2 gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {players.map((player) => (
        <RecommendedCard player={player} key={player.id} />
      ))}
    </div>
  );
};

export default Recommendations;
