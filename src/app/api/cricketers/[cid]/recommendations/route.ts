import { TPlayer } from '@cric-app/types/players';
import { NextRequest } from 'next/server';
import getPlayers from '@cric-app/data-source/get-players';

// Basic scoring mechanism, filter all players with a type then rank them
// based on attributes, least score = closest
const getRecommendations = (
  player: TPlayer,
  data: TPlayer[],
  maxCount = 5
): (TPlayer & { score: number })[] => {
  if (!player) return [];
  let similarPlayerBasedOnTypes = data.filter(
    (_player) => _player.id !== player.id
  ) as TPlayer[];

  // If player has type, filter
  if (player?.type) {
    similarPlayerBasedOnTypes = similarPlayerBasedOnTypes.filter(
      (_player) => _player.type === player.type
    );
  }

  let similarPlayers = [];
  for (let _player of similarPlayerBasedOnTypes) {
    let score = 0;
    if (player?.points)
      score += Math.abs(player.points - (_player.points || 0));

    similarPlayers.push({ ..._player, score });
  }
  return similarPlayers
    .sort((prevValue, currentValue) => prevValue.score - currentValue.score)
    .slice(0, maxCount);
};

export async function GET(
  _: NextRequest,
  { params }: { params: { cid: string } }
) {
  let data;
  console.log('STARTING RECOMMENDATIONS');

  try {
    data = await getPlayers();
  } catch (e: any) {
    return Response.json(
      { message: e?.message || 'Something went wrong' },
      { status: 500 }
    );
  }
  console.log('RECOMMENDATIONS');
  const player = data.find((player) => player.id === params?.cid) as TPlayer;
  const players: TPlayer[] = getRecommendations(player, data) as TPlayer[];
  return Response.json({ players });
}
