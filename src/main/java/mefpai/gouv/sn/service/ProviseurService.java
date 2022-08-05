package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Proviseur;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Proviseur}.
 */
public interface ProviseurService {
    /**
     * Save a proviseur.
     *
     * @param proviseur the entity to save.
     * @return the persisted entity.
     */
    Proviseur save(Proviseur proviseur);

    /**
     * Partially updates a proviseur.
     *
     * @param proviseur the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Proviseur> partialUpdate(Proviseur proviseur);

    /**
     * Get all the proviseurs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Proviseur> findAll(Pageable pageable);

    /**
     * Get the "id" proviseur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Proviseur> findOne(Long id);

    /**
     * Delete the "id" proviseur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
