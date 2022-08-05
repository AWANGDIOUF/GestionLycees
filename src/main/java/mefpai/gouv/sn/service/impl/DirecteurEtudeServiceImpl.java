package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.DirecteurEtude;
import mefpai.gouv.sn.repository.DirecteurEtudeRepository;
import mefpai.gouv.sn.service.DirecteurEtudeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DirecteurEtude}.
 */
@Service
@Transactional
public class DirecteurEtudeServiceImpl implements DirecteurEtudeService {

    private final Logger log = LoggerFactory.getLogger(DirecteurEtudeServiceImpl.class);

    private final DirecteurEtudeRepository directeurEtudeRepository;

    public DirecteurEtudeServiceImpl(DirecteurEtudeRepository directeurEtudeRepository) {
        this.directeurEtudeRepository = directeurEtudeRepository;
    }

    @Override
    public DirecteurEtude save(DirecteurEtude directeurEtude) {
        log.debug("Request to save DirecteurEtude : {}", directeurEtude);
        return directeurEtudeRepository.save(directeurEtude);
    }

    @Override
    public Optional<DirecteurEtude> partialUpdate(DirecteurEtude directeurEtude) {
        log.debug("Request to partially update DirecteurEtude : {}", directeurEtude);

        return directeurEtudeRepository
            .findById(directeurEtude.getId())
            .map(
                existingDirecteurEtude -> {
                    if (directeurEtude.getNomPrenom() != null) {
                        existingDirecteurEtude.setNomPrenom(directeurEtude.getNomPrenom());
                    }

                    return existingDirecteurEtude;
                }
            )
            .map(directeurEtudeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<DirecteurEtude> findAll(Pageable pageable) {
        log.debug("Request to get all DirecteurEtudes");
        return directeurEtudeRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DirecteurEtude> findOne(Long id) {
        log.debug("Request to get DirecteurEtude : {}", id);
        return directeurEtudeRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete DirecteurEtude : {}", id);
        directeurEtudeRepository.deleteById(id);
    }
}
