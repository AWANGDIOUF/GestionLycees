package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.ReformeMatiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ReformeMatiere}.
 */
public interface ReformeMatiereService {
    /**
     * Save a reformeMatiere.
     *
     * @param reformeMatiere the entity to save.
     * @return the persisted entity.
     */
    ReformeMatiere save(ReformeMatiere reformeMatiere);

    /**
     * Partially updates a reformeMatiere.
     *
     * @param reformeMatiere the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ReformeMatiere> partialUpdate(ReformeMatiere reformeMatiere);

    /**
     * Get all the reformeMatieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ReformeMatiere> findAll(Pageable pageable);

    Page<ReformeMatiere> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" reformeMatiere.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ReformeMatiere> findOne(Long id);

    /**
     * Delete the "id" reformeMatiere.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
