package mefpai.gouv.sn.service;

import java.util.List;
import java.util.Optional;
import mefpai.gouv.sn.domain.LyceesTechniques;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link LyceesTechniques}.
 */
public interface LyceesTechniquesService {
    /**
     * Save a lyceesTechniques.
     *
     * @param lyceesTechniques the entity to save.
     * @return the persisted entity.
     */
    LyceesTechniques save(LyceesTechniques lyceesTechniques);

    /**
     * Partially updates a lyceesTechniques.
     *
     * @param lyceesTechniques the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LyceesTechniques> partialUpdate(LyceesTechniques lyceesTechniques);

    /**
     * Get all the lyceesTechniques.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LyceesTechniques> findAll(Pageable pageable);
    /**
     * Get all the LyceesTechniques where LyceeTechnique is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<LyceesTechniques> findAllWhereLyceeTechniqueIsNull();
    /**
     * Get all the LyceesTechniques where Proviseur is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<LyceesTechniques> findAllWhereProviseurIsNull();
    /**
     * Get all the LyceesTechniques where DirecteurEtude is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<LyceesTechniques> findAllWhereDirecteurEtudeIsNull();
    /**
     * Get all the LyceesTechniques where ComptableFinancie is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<LyceesTechniques> findAllWhereComptableFinancieIsNull();
    /**
     * Get all the LyceesTechniques where ComptableMatiere is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<LyceesTechniques> findAllWhereComptableMatiereIsNull();

    /**
     * Get the "id" lyceesTechniques.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LyceesTechniques> findOne(Long id);

    /**
     * Delete the "id" lyceesTechniques.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
