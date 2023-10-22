import { TMayBe, TPlayer, TPlayerType } from '@cric-app/types/players';
import data from './players';
import { NextRequest } from 'next/server';
import { paginate } from '@cric-app/lib/utils';

const getPlayers = (args?: {
  type?: TMayBe<TPlayerType>;
  q?: string;
}): Promise<TPlayer[]> => {
  return Promise.resolve<TPlayer[]>(
    (data as TPlayer[])
      .sort((a, b) => {
        const aPoints = a.points ?? 0;
        const bPoints = b.points ?? 0;

        return aPoints === bPoints ? 0 : bPoints > aPoints ? 1 : -1;
      })
      .map((it, index) => ({
        ...it,
        rank: index + 1,
      }))
      .filter((it) => (args?.type ? it.type === args?.type : true))
      .filter((it) => it.name?.toLowerCase()?.includes(args?.q || ''))
  );
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') as string;
  const q = searchParams.get('q') as string;
  const pg = searchParams.get('pg');
  const pageSize = searchParams.get('size');

  const args = { type: type as TPlayerType, q };
  const players = await getPlayers(args);
  const paginatedData = paginate(
    players,
    parseInt(pg || '0'),
    parseInt(pageSize || '10')
  );
  return Response.json({ ...paginatedData });
}
