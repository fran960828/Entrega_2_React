/** * Component: parseJson
 * Manejo de respuestas vacias
 * Peticiones HTTP
 */

export const parseJson = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  return text && JSON.parse(text);
};