package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Programme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Programme}.
 */
public interface ProgrammeService {
    /**
     * Save a programme.
     *
     * @param programme the entity to save.
     * @return the persisted entity.
     */
    Programme save(Programme programme);

    /**
     * Partially updates a programme.
     *
     * @param programme the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Programme> partialUpdate(Programme programme);

    /**
     * Get all the programmes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Programme> findAll(Pageable pageable);

    Page<Programme> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" programme.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Programme> findOne(Long id);

    /**
     * Delete the "id" programme.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
