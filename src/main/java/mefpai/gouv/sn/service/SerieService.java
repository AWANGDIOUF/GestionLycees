package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Serie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Serie}.
 */
public interface SerieService {
    /**
     * Save a serie.
     *
     * @param serie the entity to save.
     * @return the persisted entity.
     */
    Serie save(Serie serie);

    /**
     * Partially updates a serie.
     *
     * @param serie the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Serie> partialUpdate(Serie serie);

    /**
     * Get all the series.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Serie> findAll(Pageable pageable);

    Page<Serie> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" serie.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Serie> findOne(Long id);

    /**
     * Delete the "id" serie.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
