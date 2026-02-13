import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useByIds = <T>(
  queryKeyPrefix: string,
  ids: number[],
  fetchFn: (ids: number[]) => Promise<T>
) => {
  return useQuery({
    queryKey: [queryKeyPrefix, ids],
    queryFn: () => fetchFn(ids),
    enabled: ids.length>0,
    staleTime: 1000 * 60 * 10,
    placeholderData:keepPreviousData
  });
};
