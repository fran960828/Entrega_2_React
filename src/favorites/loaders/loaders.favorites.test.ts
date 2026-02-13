import { describe, it, expect, vi, beforeEach } from 'vitest';
import { favoritesLoader } from './loaders.favorites';
import { queryClient } from '../../main';


// Mockeamos el queryClient y los servicios
vi.mock('../../main', () => ({
  queryClient: {
    ensureQueryData: vi.fn(),
  },
}));


describe('favoritesLoader', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('debe realizar el prefetch de personajes y episodios si hay IDs en localStorage', async () => {
    // Arrange: Preparamos el localStorage
    const mockCharIds = [1, 2];
    const mockEpisodeIds = [10, 11];
    localStorage.setItem("favCharacters", JSON.stringify(mockCharIds));
    localStorage.setItem("favEpisodes", JSON.stringify(mockEpisodeIds));

    // Act
    const result = await favoritesLoader();

    // Assert: Verificamos que se llamó a prefetch con los IDs unidos por coma
    expect(queryClient.ensureQueryData).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ["fav-characters-data", "1,2"] })
    );
    expect(queryClient.ensureQueryData).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ["fav-episodes-data", "10,11"] })
    );
    
    expect(result).toEqual({ 
      favcharIds: "1,2", 
      favEpisodesIds: "10,11" 
    });
  });

  it('no debe realizar prefetch si el localStorage está vacío', async () => {
    // Act
    const result = await favoritesLoader();

    // Assert: ensureQueryData NO debe haberse llamado
    expect(queryClient.ensureQueryData).not.toHaveBeenCalled();
    expect(result).toEqual({ favcharIds: "", favEpisodesIds: "" });
  });

  it('debe manejar el caso donde solo hay favoritos de un tipo', async () => {
    localStorage.setItem("favCharacters", JSON.stringify([1]));
    

    const result = await favoritesLoader();

    expect(queryClient.ensureQueryData).toHaveBeenCalledTimes(1);
    expect(result.favcharIds).toBe("1");
    expect(result.favEpisodesIds).toBe("");
  });
});