package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.MouvementMatiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link MouvementMatiere}.
 */
public interface MouvementMatiereService {
    /**
     * Save a mouvementMatiere.
     *
     * @param mouvementMatiere the entity to save.
     * @return the persisted entity.
     */
    MouvementMatiere save(MouvementMatiere mouvementMatiere);

    /**
     * Partially updates a mouvementMatiere.
     *
     * @param mouvementMatiere the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MouvementMatiere> partialUpdate(MouvementMatiere mouvementMatiere);

    /**
     * Get all the mouvementMatieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<MouvementMatiere> findAll(Pageable pageable);

    Page<MouvementMatiere> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" mouvementMatiere.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MouvementMatiere> findOne(Long id);

    /**
     * Delete the "id" mouvementMatiere.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
