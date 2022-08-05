package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.PersonnelAppui;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link PersonnelAppui}.
 */
public interface PersonnelAppuiService {
    /**
     * Save a personnelAppui.
     *
     * @param personnelAppui the entity to save.
     * @return the persisted entity.
     */
    PersonnelAppui save(PersonnelAppui personnelAppui);

    /**
     * Partially updates a personnelAppui.
     *
     * @param personnelAppui the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PersonnelAppui> partialUpdate(PersonnelAppui personnelAppui);

    /**
     * Get all the personnelAppuis.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PersonnelAppui> findAll(Pageable pageable);

    Page<PersonnelAppui> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" personnelAppui.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PersonnelAppui> findOne(Long id);

    /**
     * Delete the "id" personnelAppui.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
