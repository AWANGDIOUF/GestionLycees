package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.IventaireDesMatetiere;
import mefpai.gouv.sn.repository.IventaireDesMatetiereRepository;
import mefpai.gouv.sn.service.IventaireDesMatetiereService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link IventaireDesMatetiere}.
 */
@Service
@Transactional
public class IventaireDesMatetiereServiceImpl implements IventaireDesMatetiereService {

    private final Logger log = LoggerFactory.getLogger(IventaireDesMatetiereServiceImpl.class);

    private final IventaireDesMatetiereRepository iventaireDesMatetiereRepository;

    public IventaireDesMatetiereServiceImpl(IventaireDesMatetiereRepository iventaireDesMatetiereRepository) {
        this.iventaireDesMatetiereRepository = iventaireDesMatetiereRepository;
    }

    @Override
    public IventaireDesMatetiere save(IventaireDesMatetiere iventaireDesMatetiere) {
        log.debug("Request to save IventaireDesMatetiere : {}", iventaireDesMatetiere);
        return iventaireDesMatetiereRepository.save(iventaireDesMatetiere);
    }

    @Override
    public Optional<IventaireDesMatetiere> partialUpdate(IventaireDesMatetiere iventaireDesMatetiere) {
        log.debug("Request to partially update IventaireDesMatetiere : {}", iventaireDesMatetiere);

        return iventaireDesMatetiereRepository
            .findById(iventaireDesMatetiere.getId())
            .map(
                existingIventaireDesMatetiere -> {
                    if (iventaireDesMatetiere.getGroup() != null) {
                        existingIventaireDesMatetiere.setGroup(iventaireDesMatetiere.getGroup());
                    }
                    if (iventaireDesMatetiere.getDesignationMembre() != null) {
                        existingIventaireDesMatetiere.setDesignationMembre(iventaireDesMatetiere.getDesignationMembre());
                    }
                    if (iventaireDesMatetiere.getDesignationMembreContentType() != null) {
                        existingIventaireDesMatetiere.setDesignationMembreContentType(
                            iventaireDesMatetiere.getDesignationMembreContentType()
                        );
                    }
                    if (iventaireDesMatetiere.getPvDinventaire() != null) {
                        existingIventaireDesMatetiere.setPvDinventaire(iventaireDesMatetiere.getPvDinventaire());
                    }
                    if (iventaireDesMatetiere.getPvDinventaireContentType() != null) {
                        existingIventaireDesMatetiere.setPvDinventaireContentType(iventaireDesMatetiere.getPvDinventaireContentType());
                    }

                    return existingIventaireDesMatetiere;
                }
            )
            .map(iventaireDesMatetiereRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<IventaireDesMatetiere> findAll(Pageable pageable) {
        log.debug("Request to get all IventaireDesMatetieres");
        return iventaireDesMatetiereRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<IventaireDesMatetiere> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all IventaireDesMatetiere");
        return iventaireDesMatetiereRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<IventaireDesMatetiere> findOne(Long id) {
        log.debug("Request to get IventaireDesMatetiere : {}", id);
        return iventaireDesMatetiereRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete IventaireDesMatetiere : {}", id);
        iventaireDesMatetiereRepository.deleteById(id);
    }
}
