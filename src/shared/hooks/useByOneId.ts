import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useByOneId = <T>(
  queryKeyPrefix: string,
  id: number,
  fetchFn: (ids: number) => Promise<T>
) => {
  return useQuery({
    queryKey: [queryKeyPrefix, id],
    queryFn: () => fetchFn(id),
    enabled:!!id,
    staleTime: 1000 * 60 * 10,
    placeholderData:keepPreviousData
  });
};