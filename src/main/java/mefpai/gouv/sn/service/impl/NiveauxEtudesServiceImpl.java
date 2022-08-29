package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.NiveauxEtudes;
import mefpai.gouv.sn.repository.NiveauxEtudesRepository;
import mefpai.gouv.sn.service.NiveauxEtudesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NiveauxEtudes}.
 */
@Service
@Transactional
public class NiveauxEtudesServiceImpl implements NiveauxEtudesService {

    private final Logger log = LoggerFactory.getLogger(NiveauxEtudesServiceImpl.class);

    private final NiveauxEtudesRepository niveauxEtudesRepository;

    public NiveauxEtudesServiceImpl(NiveauxEtudesRepository niveauxEtudesRepository) {
        this.niveauxEtudesRepository = niveauxEtudesRepository;
    }

    @Override
    public NiveauxEtudes save(NiveauxEtudes niveauxEtudes) {
        log.debug("Request to save NiveauxEtudes : {}", niveauxEtudes);
        return niveauxEtudesRepository.save(niveauxEtudes);
    }

    @Override
    public Optional<NiveauxEtudes> partialUpdate(NiveauxEtudes niveauxEtudes) {
        log.debug("Request to partially update NiveauxEtudes : {}", niveauxEtudes);

        return niveauxEtudesRepository
            .findById(niveauxEtudes.getId())
            .map(
                existingNiveauxEtudes -> {
                    if (niveauxEtudes.getNomNiveau() != null) {
                        existingNiveauxEtudes.setNomNiveau(niveauxEtudes.getNomNiveau());
                    }

                    return existingNiveauxEtudes;
                }
            )
            .map(niveauxEtudesRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NiveauxEtudes> findAll(Pageable pageable) {
        log.debug("Request to get all NiveauxEtudes");
        return niveauxEtudesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<NiveauxEtudes> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all NiveauxEtudes");
        return niveauxEtudesRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<NiveauxEtudes> findOne(Long id) {
        log.debug("Request to get NiveauxEtudes : {}", id);
        return niveauxEtudesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete NiveauxEtudes : {}", id);
        niveauxEtudesRepository.deleteById(id);
    }
}
