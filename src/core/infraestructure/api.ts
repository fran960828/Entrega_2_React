const parseJson = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  return text && JSON.parse(text);
};

export const httpClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(url);
    if (!res.ok)
      throw new Response(
        JSON.stringify({ message: "Could not fetch events." }),
        {
          status: 500,
        }
      );
    return parseJson<T>(res);
  },
};

export const urls={
  characters: "https://rickandmortyapi.com/api/character",
  locations: "https://rickandmortyapi.com/api/location",
  episodes: "https://rickandmortyapi.com/api/episode"
}