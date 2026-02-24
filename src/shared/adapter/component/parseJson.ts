/** * Component: parseJson
 * Manejo de respuestas vacias
 * Peticiones HTTP
 */

export const ParseJson = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  return text && JSON.parse(text);
};

