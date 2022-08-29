package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.ComptableFinancier;
import mefpai.gouv.sn.repository.ComptableFinancierRepository;
import mefpai.gouv.sn.service.ComptableFinancierService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ComptableFinancier}.
 */
@Service
@Transactional
public class ComptableFinancierServiceImpl implements ComptableFinancierService {

    private final Logger log = LoggerFactory.getLogger(ComptableFinancierServiceImpl.class);

    private final ComptableFinancierRepository comptableFinancierRepository;

    public ComptableFinancierServiceImpl(ComptableFinancierRepository comptableFinancierRepository) {
        this.comptableFinancierRepository = comptableFinancierRepository;
    }

    @Override
    public ComptableFinancier save(ComptableFinancier comptableFinancier) {
        log.debug("Request to save ComptableFinancier : {}", comptableFinancier);
        return comptableFinancierRepository.save(comptableFinancier);
    }

    @Override
    public Optional<ComptableFinancier> partialUpdate(ComptableFinancier comptableFinancier) {
        log.debug("Request to partially update ComptableFinancier : {}", comptableFinancier);

        return comptableFinancierRepository
            .findById(comptableFinancier.getId())
            .map(
                existingComptableFinancier -> {
                    if (comptableFinancier.getNomPrenom() != null) {
                        existingComptableFinancier.setNomPrenom(comptableFinancier.getNomPrenom());
                    }

                    return existingComptableFinancier;
                }
            )
            .map(comptableFinancierRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ComptableFinancier> findAll(Pageable pageable) {
        log.debug("Request to get all ComptableFinanciers");
        return comptableFinancierRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ComptableFinancier> findOne(Long id) {
        log.debug("Request to get ComptableFinancier : {}", id);
        return comptableFinancierRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ComptableFinancier : {}", id);
        comptableFinancierRepository.deleteById(id);
    }
}
