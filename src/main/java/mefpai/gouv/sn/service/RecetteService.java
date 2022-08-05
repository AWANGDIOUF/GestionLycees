package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Recette;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Recette}.
 */
public interface RecetteService {
    /**
     * Save a recette.
     *
     * @param recette the entity to save.
     * @return the persisted entity.
     */
    Recette save(Recette recette);

    /**
     * Partially updates a recette.
     *
     * @param recette the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Recette> partialUpdate(Recette recette);

    /**
     * Get all the recettes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Recette> findAll(Pageable pageable);

    Page<Recette> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" recette.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Recette> findOne(Long id);

    /**
     * Delete the "id" recette.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
