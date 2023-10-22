import { api } from '@cric-app/lib/api';
import { TGetReponsePlayers } from '@cric-app/types/players';
import { InitialTableState } from '@tanstack/react-table';
import { columns } from '../cricketers-table/columns';
import { DataTable } from '../data-table';

const Results = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const urlSearchParams = new URLSearchParams(searchParams);
  const data = (await (
    await api(`/api/cricketers?${urlSearchParams}`)
  ).json()) as TGetReponsePlayers;
  const players = data.items;
  const { sorting, pg, size } = searchParams;
  let initialState: InitialTableState = {
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  };
  if (sorting) {
    try {
      initialState = {
        ...initialState,
        sorting: JSON.parse(sorting),
      };
    } catch {
      //pass
    }
  }

  if (initialState['pagination']) {
    initialState['pagination'].pageIndex = parseInt(pg) || 0;
    initialState['pagination'].pageSize = parseInt(size) || 10;
    console.log(pg, size, 'SIZE');
  }

  return (
    <DataTable
      columns={columns}
      data={players}
      initialTableState={{ ...initialState }}
      enableRouting
      pageCount={data.pageCount}
      manualPagination
      key={JSON.stringify(searchParams)}
    />
  );
};
export default Results;
