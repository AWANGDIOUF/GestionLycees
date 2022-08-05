package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Attribution;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Attribution}.
 */
public interface AttributionService {
    /**
     * Save a attribution.
     *
     * @param attribution the entity to save.
     * @return the persisted entity.
     */
    Attribution save(Attribution attribution);

    /**
     * Partially updates a attribution.
     *
     * @param attribution the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Attribution> partialUpdate(Attribution attribution);

    /**
     * Get all the attributions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Attribution> findAll(Pageable pageable);

    /**
     * Get the "id" attribution.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Attribution> findOne(Long id);

    /**
     * Delete the "id" attribution.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
