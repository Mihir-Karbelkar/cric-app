import { NextRequest } from 'next/server';
import data from '../players';

export async function GET(
  _: NextRequest,
  { params }: { params: { cid: string } }
) {
  return Response.json({
    player: data.find((player) => player.id === params.cid),
  });
}
