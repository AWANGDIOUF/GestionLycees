package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.ComptableMatiere;
import mefpai.gouv.sn.repository.ComptableMatiereRepository;
import mefpai.gouv.sn.service.ComptableMatiereService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ComptableMatiere}.
 */
@Service
@Transactional
public class ComptableMatiereServiceImpl implements ComptableMatiereService {

    private final Logger log = LoggerFactory.getLogger(ComptableMatiereServiceImpl.class);

    private final ComptableMatiereRepository comptableMatiereRepository;

    public ComptableMatiereServiceImpl(ComptableMatiereRepository comptableMatiereRepository) {
        this.comptableMatiereRepository = comptableMatiereRepository;
    }

    @Override
    public ComptableMatiere save(ComptableMatiere comptableMatiere) {
        log.debug("Request to save ComptableMatiere : {}", comptableMatiere);
        return comptableMatiereRepository.save(comptableMatiere);
    }

    @Override
    public Optional<ComptableMatiere> partialUpdate(ComptableMatiere comptableMatiere) {
        log.debug("Request to partially update ComptableMatiere : {}", comptableMatiere);

        return comptableMatiereRepository
            .findById(comptableMatiere.getId())
            .map(
                existingComptableMatiere -> {
                    if (comptableMatiere.getNomPrenom() != null) {
                        existingComptableMatiere.setNomPrenom(comptableMatiere.getNomPrenom());
                    }

                    return existingComptableMatiere;
                }
            )
            .map(comptableMatiereRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ComptableMatiere> findAll(Pageable pageable) {
        log.debug("Request to get all ComptableMatieres");
        return comptableMatiereRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ComptableMatiere> findOne(Long id) {
        log.debug("Request to get ComptableMatiere : {}", id);
        return comptableMatiereRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComptableMatiere : {}", id);
        comptableMatiereRepository.deleteById(id);
    }
}
