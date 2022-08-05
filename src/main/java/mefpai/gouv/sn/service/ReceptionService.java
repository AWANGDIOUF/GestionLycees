package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Reception;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Reception}.
 */
public interface ReceptionService {
    /**
     * Save a reception.
     *
     * @param reception the entity to save.
     * @return the persisted entity.
     */
    Reception save(Reception reception);

    /**
     * Partially updates a reception.
     *
     * @param reception the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Reception> partialUpdate(Reception reception);

    /**
     * Get all the receptions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Reception> findAll(Pageable pageable);

    Page<Reception> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" reception.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Reception> findOne(Long id);

    /**
     * Delete the "id" reception.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
