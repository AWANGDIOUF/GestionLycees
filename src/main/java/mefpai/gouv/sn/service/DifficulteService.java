package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Difficulte;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Difficulte}.
 */
public interface DifficulteService {
    /**
     * Save a difficulte.
     *
     * @param difficulte the entity to save.
     * @return the persisted entity.
     */
    Difficulte save(Difficulte difficulte);

    /**
     * Partially updates a difficulte.
     *
     * @param difficulte the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Difficulte> partialUpdate(Difficulte difficulte);

    /**
     * Get all the difficultes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Difficulte> findAll(Pageable pageable);

    Page<Difficulte> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" difficulte.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Difficulte> findOne(Long id);

    /**
     * Delete the "id" difficulte.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
