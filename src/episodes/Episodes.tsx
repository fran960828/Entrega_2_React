/** * CONTAINER: Episodes
 * Orquestador del listado de episodios y gestión de paginación.
 * Optimizado: Sincronización directa con URL mediante eventos, eliminando efectos secundarios.
 */

// src/modules/episodes/Episodes.tsx
import { useSearchParams } from "react-router-dom";
import { useModal } from "../shared/components/Modal/context/ModalContext";
import { Modal } from "../shared/components/Modal/Modal";
import { EpisodeCastContainer } from "./components/EpisodeCastContainer";
import { getAllEpisodesUI } from "./services";
import { useGenericPagination } from "../shared/hooks";
import classes from "./Episodes.module.css";
import { EpisodesCard } from "./components";
// ... (tus otros imports)

export const Episodes = () => {
  const { activeId, closeModal } = useModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data } = useGenericPagination("episodes", getAllEpisodesUI, {
    page: currentPage,
  });

  // ... (handlePageChange igual que antes)

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Broadcast History</h2>
      <div className={classes.list}>
        {data?.results.map((episode) => (
          <EpisodesCard key={episode.id} episode={episode} />
        ))}
      </div>

      {/* LÓGICA DE MODAL: El contenedor decide qué mostrar en el Modal compartido */}
      {activeId && (
        <Modal onClose={closeModal} title="Characters in Episode">
          <EpisodeCastContainer
            episodeId={Number(activeId)}
            onClose={closeModal}
          />
        </Modal>
      )}

      {/* Pagination... */}
    </section>
  );
};
