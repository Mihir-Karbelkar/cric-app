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
      <Card className="p-4 h-[150px]">
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>{getInitials(player?.name || '')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{player?.name}</CardTitle>
            <CardDescription className="mt-2 line-clamp-3">
              {player.description}
            </CardDescription>
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

  return (
    <div className="mt-2 gap-4 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {players.map((player) => (
        <div key={player.id}>
          <RecommendedCard player={player} />
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
