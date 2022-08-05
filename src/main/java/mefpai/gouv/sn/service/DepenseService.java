package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.Depense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Depense}.
 */
public interface DepenseService {
    /**
     * Save a depense.
     *
     * @param depense the entity to save.
     * @return the persisted entity.
     */
    Depense save(Depense depense);

    /**
     * Partially updates a depense.
     *
     * @param depense the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Depense> partialUpdate(Depense depense);

    /**
     * Get all the depenses.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Depense> findAll(Pageable pageable);

    Page<Depense> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" depense.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Depense> findOne(Long id);

    /**
     * Delete the "id" depense.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
