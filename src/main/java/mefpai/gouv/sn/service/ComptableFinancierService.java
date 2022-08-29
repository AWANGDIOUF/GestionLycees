package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.ComptableFinancier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ComptableFinancier}.
 */
public interface ComptableFinancierService {
    /**
     * Save a comptableFinancier.
     *
     * @param comptableFinancier the entity to save.
     * @return the persisted entity.
     */
    ComptableFinancier save(ComptableFinancier comptableFinancier);

    /**
     * Partially updates a comptableFinancier.
     *
     * @param comptableFinancier the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ComptableFinancier> partialUpdate(ComptableFinancier comptableFinancier);

    /**
     * Get all the comptableFinanciers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ComptableFinancier> findAll(Pageable pageable);

    /**
     * Get the "id" comptableFinancier.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ComptableFinancier> findOne(Long id);

    /**
     * Delete the "id" comptableFinancier.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
