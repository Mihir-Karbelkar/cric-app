import { NextRequest } from 'next/server';
import getPlayers from '@cric-app/data-source/get-players';
import { TPlayer } from '@cric-app/types/players';

export async function GET(
  _: NextRequest,
  { params }: { params: { cid: string } }
) {
  let players: TPlayer[] = [];
  try {
    players = await getPlayers();
  } catch (e: any) {
    return Response.json(
      { message: e?.message || 'Something went wrong' },
      { status: 500 }
    );
  }
  const player =
    (players || [])?.find((player) => player.id === params.cid) || null;

  return Response.json({
    player,
  });
}
