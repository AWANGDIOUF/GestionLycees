package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Materiel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Materiel}.
 */
public interface MaterielService {
    /**
     * Save a materiel.
     *
     * @param materiel the entity to save.
     * @return the persisted entity.
     */
    Materiel save(Materiel materiel);

    /**
     * Partially updates a materiel.
     *
     * @param materiel the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Materiel> partialUpdate(Materiel materiel);

    /**
     * Get all the materiels.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Materiel> findAll(Pageable pageable);

    /**
     * Get the "id" materiel.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Materiel> findOne(Long id);

    /**
     * Delete the "id" materiel.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
