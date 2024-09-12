import React, { useEffect } from 'react';
import apiClient from '../services/api-client';
import { CanceledError } from 'axios';

export interface Platform {
  id: number;
  name: string;
  slug: string;
}
export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = React.useState<Game[]>([]);
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    apiClient
      .get<FetchGamesResponse>('/games', { signal: controller.signal })
      .then((res) => {
        setGames(res.data.results);
        setIsLoading(false);
      })

      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
