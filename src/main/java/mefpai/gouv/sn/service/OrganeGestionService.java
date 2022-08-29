package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.OrganeGestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link OrganeGestion}.
 */
public interface OrganeGestionService {
    /**
     * Save a organeGestion.
     *
     * @param organeGestion the entity to save.
     * @return the persisted entity.
     */
    OrganeGestion save(OrganeGestion organeGestion);

    /**
     * Partially updates a organeGestion.
     *
     * @param organeGestion the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OrganeGestion> partialUpdate(OrganeGestion organeGestion);

    /**
     * Get all the organeGestions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrganeGestion> findAll(Pageable pageable);

    Page<OrganeGestion> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" organeGestion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrganeGestion> findOne(Long id);

    /**
     * Delete the "id" organeGestion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
