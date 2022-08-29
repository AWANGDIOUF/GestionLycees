package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Concours;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Concours}.
 */
public interface ConcoursService {
    /**
     * Save a concours.
     *
     * @param concours the entity to save.
     * @return the persisted entity.
     */
    Concours save(Concours concours);

    /**
     * Partially updates a concours.
     *
     * @param concours the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Concours> partialUpdate(Concours concours);

    /**
     * Get all the concours.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Concours> findAll(Pageable pageable);

    Page<Concours> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" concours.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Concours> findOne(Long id);

    /**
     * Delete the "id" concours.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
