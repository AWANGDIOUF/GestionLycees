package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.ComptableMatiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ComptableMatiere}.
 */
public interface ComptableMatiereService {
    /**
     * Save a comptableMatiere.
     *
     * @param comptableMatiere the entity to save.
     * @return the persisted entity.
     */
    ComptableMatiere save(ComptableMatiere comptableMatiere);

    /**
     * Partially updates a comptableMatiere.
     *
     * @param comptableMatiere the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ComptableMatiere> partialUpdate(ComptableMatiere comptableMatiere);

    /**
     * Get all the comptableMatieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ComptableMatiere> findAll(Pageable pageable);

    /**
     * Get the "id" comptableMatiere.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ComptableMatiere> findOne(Long id);

    /**
     * Delete the "id" comptableMatiere.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
