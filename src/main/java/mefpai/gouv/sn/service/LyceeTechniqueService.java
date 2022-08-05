package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.LyceeTechnique;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link LyceeTechnique}.
 */
public interface LyceeTechniqueService {
    /**
     * Save a lyceeTechnique.
     *
     * @param lyceeTechnique the entity to save.
     * @return the persisted entity.
     */
    LyceeTechnique save(LyceeTechnique lyceeTechnique);

    /**
     * Partially updates a lyceeTechnique.
     *
     * @param lyceeTechnique the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LyceeTechnique> partialUpdate(LyceeTechnique lyceeTechnique);

    /**
     * Get all the lyceeTechniques.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LyceeTechnique> findAll(Pageable pageable);

    Page<LyceeTechnique> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" lyceeTechnique.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LyceeTechnique> findOne(Long id);

    /**
     * Delete the "id" lyceeTechnique.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
