package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Visite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Visite}.
 */
public interface VisiteService {
    /**
     * Save a visite.
     *
     * @param visite the entity to save.
     * @return the persisted entity.
     */
    Visite save(Visite visite);

    /**
     * Partially updates a visite.
     *
     * @param visite the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Visite> partialUpdate(Visite visite);

    /**
     * Get all the visites.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Visite> findAll(Pageable pageable);

    Page<Visite> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" visite.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Visite> findOne(Long id);

    /**
     * Delete the "id" visite.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
