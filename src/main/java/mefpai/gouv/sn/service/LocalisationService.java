package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Localisation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Localisation}.
 */
public interface LocalisationService {
    /**
     * Save a localisation.
     *
     * @param localisation the entity to save.
     * @return the persisted entity.
     */
    Localisation save(Localisation localisation);

    /**
     * Partially updates a localisation.
     *
     * @param localisation the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Localisation> partialUpdate(Localisation localisation);

    /**
     * Get all the localisations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Localisation> findAll(Pageable pageable);

    /**
     * Get the "id" localisation.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Localisation> findOne(Long id);

    /**
     * Delete the "id" localisation.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
