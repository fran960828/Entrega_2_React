import type { LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from "../../main";

export const createPaginationLoader = <T>(
  queryKey: string,
  fetchFn: (filters: any) => Promise<T>
) => {
  return async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    
    const filters = {
      page: Number(url.searchParams.get("page")) || 1,
      name: url.searchParams.get("name") || "",
      status: url.searchParams.get("status") || "",
      species: url.searchParams.get("species") || ""
    };

    try {
      return await queryClient.ensureQueryData({
        queryKey: [queryKey, filters],
        queryFn: () => fetchFn(filters),
      });
    } catch (error: any) {
      if (error.status === 404 || error.response?.status === 404) {
        const emptyData = { results: [], info: { pages: 0, count: 0 } };
        queryClient.setQueryData([queryKey, filters], emptyData);
        return emptyData;
      }
      throw error;
    }
  };
};