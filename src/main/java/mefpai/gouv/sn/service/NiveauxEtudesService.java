package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.NiveauxEtudes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link NiveauxEtudes}.
 */
public interface NiveauxEtudesService {
    /**
     * Save a niveauxEtudes.
     *
     * @param niveauxEtudes the entity to save.
     * @return the persisted entity.
     */
    NiveauxEtudes save(NiveauxEtudes niveauxEtudes);

    /**
     * Partially updates a niveauxEtudes.
     *
     * @param niveauxEtudes the entity to update partially.
     * @return the persisted entity.
     */
    Optional<NiveauxEtudes> partialUpdate(NiveauxEtudes niveauxEtudes);

    /**
     * Get all the niveauxEtudes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NiveauxEtudes> findAll(Pageable pageable);

    Page<NiveauxEtudes> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" niveauxEtudes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NiveauxEtudes> findOne(Long id);

    /**
     * Delete the "id" niveauxEtudes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
