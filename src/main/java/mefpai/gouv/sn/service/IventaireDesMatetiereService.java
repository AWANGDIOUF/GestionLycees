package mefpai.gouv.sn.service;

import java.util.Optional;
import mefpai.gouv.sn.domain.IventaireDesMatetiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link IventaireDesMatetiere}.
 */
public interface IventaireDesMatetiereService {
    /**
     * Save a iventaireDesMatetiere.
     *
     * @param iventaireDesMatetiere the entity to save.
     * @return the persisted entity.
     */
    IventaireDesMatetiere save(IventaireDesMatetiere iventaireDesMatetiere);

    /**
     * Partially updates a iventaireDesMatetiere.
     *
     * @param iventaireDesMatetiere the entity to update partially.
     * @return the persisted entity.
     */
    Optional<IventaireDesMatetiere> partialUpdate(IventaireDesMatetiere iventaireDesMatetiere);

    /**
     * Get all the iventaireDesMatetieres.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<IventaireDesMatetiere> findAll(Pageable pageable);

    Page<IventaireDesMatetiere> findByUserIsCurrentUser(Pageable pageable);

    /**
     * Get the "id" iventaireDesMatetiere.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<IventaireDesMatetiere> findOne(Long id);

    /**
     * Delete the "id" iventaireDesMatetiere.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
