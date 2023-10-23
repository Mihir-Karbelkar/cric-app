import { NextRequest } from 'next/server';
import getPlayers from '@cric-app/data-source/get-players';
import { TPlayer } from '@cric-app/types/players';

export async function GET(
  _: NextRequest,
  { params }: { params: { cid: string } }
) {
  let players: TPlayer[] = [];
  console.log('STARTING PLAYER');
  try {
    players = await getPlayers();
  } catch (e: any) {
    return Response.json(
      { message: e?.message || 'Something went wrong' },
      { status: 500 }
    );
  }
  console.log('ENDING PLAYER');

  return Response.json({
    player: players.find((player) => player.id === params.cid),
  });
}
