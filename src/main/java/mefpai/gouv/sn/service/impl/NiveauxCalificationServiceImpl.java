package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.NiveauxCalification;
import mefpai.gouv.sn.repository.NiveauxCalificationRepository;
import mefpai.gouv.sn.service.NiveauxCalificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NiveauxCalification}.
 */
@Service
@Transactional
public class NiveauxCalificationServiceImpl implements NiveauxCalificationService {

    private final Logger log = LoggerFactory.getLogger(NiveauxCalificationServiceImpl.class);

    private final NiveauxCalificationRepository niveauxCalificationRepository;

    public NiveauxCalificationServiceImpl(NiveauxCalificationRepository niveauxCalificationRepository) {
        this.niveauxCalificationRepository = niveauxCalificationRepository;
    }

    @Override
    public NiveauxCalification save(NiveauxCalification niveauxCalification) {
        log.debug("Request to save NiveauxCalification : {}", niveauxCalification);
        return niveauxCalificationRepository.save(niveauxCalification);
    }

    @Override
    public Optional<NiveauxCalification> partialUpdate(NiveauxCalification niveauxCalification) {
        log.debug("Request to partially update NiveauxCalification : {}", niveauxCalification);

        return niveauxCalificationRepository
            .findById(niveauxCalification.getId())
            .map(
                existingNiveauxCalification -> {
                    if (niveauxCalification.getNiveauCalification() != null) {
                        existingNiveauxCalification.setNiveauCalification(niveauxCalification.getNiveauCalification());
                    }

                    return existingNiveauxCalification;
                }
            )
            .map(niveauxCalificationRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NiveauxCalification> findAll(Pageable pageable) {
        log.debug("Request to get all NiveauxCalifications");
        return niveauxCalificationRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NiveauxCalification> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all NiveauxCalifications");
        return niveauxCalificationRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NiveauxCalification> findOne(Long id) {
        log.debug("Request to get NiveauxCalification : {}", id);
        return niveauxCalificationRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete NiveauxCalification : {}", id);
        niveauxCalificationRepository.deleteById(id);
    }
}
