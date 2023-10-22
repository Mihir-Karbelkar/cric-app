export type TMayBe<T> = T | null | undefined;

export type TPlayerType = 'batsman' | 'bowler' | 'allRounder' | 'wicketKeeper';

export type TPlayer = {
  id?: TMayBe<string>;
  name?: TMayBe<string>;
  description?: TMayBe<string>;
  type?: TMayBe<TPlayerType>;
  points?: TMayBe<number>;
  rank?: TMayBe<number>;
  dob?: TMayBe<number>;
};

export type TGetReponsePlayers = {
  items: TPlayer[];
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  pageCount: number;
};

export type TGetRecommendedPlayersResponse = {
  players: TPlayer[];
};

export type TGetReponsePlayer = {
  player: TPlayer;
};
