import { TMayBe, TPlayer, TPlayerType } from '@cric-app/types/players';
import { NextRequest } from 'next/server';
import { paginate } from '@cric-app/lib/utils';
import getPlayers from '@cric-app/data-source/get-players';

const getFilteredPlayers = async (args?: {
  type?: TMayBe<TPlayerType>;
  q?: string;
}): Promise<TPlayer[]> => {
  const players = await getPlayers({ type: args?.type });
  return players.filter((it) =>
    it.name?.toLowerCase()?.includes(args?.q || '')
  );
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as string;
  const q = searchParams.get('q') as string;
  const pg = searchParams.get('pg');
  const pageSize = searchParams.get('size');

  const args = { type: type as TPlayerType, q };
  const players = await getFilteredPlayers(args);
  const paginatedData = paginate(
    players,
    parseInt(pg || '0'),
    parseInt(pageSize || '10')
  );
  return Response.json({ ...paginatedData });
}
