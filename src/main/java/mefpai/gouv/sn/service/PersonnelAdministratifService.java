package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.PersonnelAdministratif;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link PersonnelAdministratif}.
 */
public interface PersonnelAdministratifService {
    /**
     * Save a personnelAdministratif.
     *
     * @param personnelAdministratif the entity to save.
     * @return the persisted entity.
     */
    PersonnelAdministratif save(PersonnelAdministratif personnelAdministratif);

    /**
     * Partially updates a personnelAdministratif.
     *
     * @param personnelAdministratif the entity to update partially.
     * @return the persisted entity.
     */
    Optional<PersonnelAdministratif> partialUpdate(PersonnelAdministratif personnelAdministratif);

    /**
     * Get all the personnelAdministratifs.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PersonnelAdministratif> findAll(Pageable pageable);

    Page<PersonnelAdministratif> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" personnelAdministratif.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PersonnelAdministratif> findOne(Long id);

    /**
     * Delete the "id" personnelAdministratif.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
