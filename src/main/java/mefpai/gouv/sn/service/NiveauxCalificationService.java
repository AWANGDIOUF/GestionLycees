package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.NiveauxCalification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link NiveauxCalification}.
 */
public interface NiveauxCalificationService {
    /**
     * Save a niveauxCalification.
     *
     * @param niveauxCalification the entity to save.
     * @return the persisted entity.
     */
    NiveauxCalification save(NiveauxCalification niveauxCalification);

    /**
     * Partially updates a niveauxCalification.
     *
     * @param niveauxCalification the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NiveauxCalification> partialUpdate(NiveauxCalification niveauxCalification);

    /**
     * Get all the niveauxCalifications.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NiveauxCalification> findAll(Pageable pageable);

    Page<NiveauxCalification> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" niveauxCalification.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NiveauxCalification> findOne(Long id);

    /**
     * Delete the "id" niveauxCalification.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
