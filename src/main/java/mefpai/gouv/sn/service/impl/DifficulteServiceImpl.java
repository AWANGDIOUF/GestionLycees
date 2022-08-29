package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Difficulte;
import mefpai.gouv.sn.repository.DifficulteRepository;
import mefpai.gouv.sn.service.DifficulteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Difficulte}.
 */
@Service
@Transactional
public class DifficulteServiceImpl implements DifficulteService {

    private final Logger log = LoggerFactory.getLogger(DifficulteServiceImpl.class);

    private final DifficulteRepository difficulteRepository;

    public DifficulteServiceImpl(DifficulteRepository difficulteRepository) {
        this.difficulteRepository = difficulteRepository;
    }

    @Override
    public Difficulte save(Difficulte difficulte) {
        log.debug("Request to save Difficulte : {}", difficulte);
        return difficulteRepository.save(difficulte);
    }

    @Override
    public Optional<Difficulte> partialUpdate(Difficulte difficulte) {
        log.debug("Request to partially update Difficulte : {}", difficulte);

        return difficulteRepository
            .findById(difficulte.getId())
            .map(
                existingDifficulte -> {
                    if (difficulte.getNature() != null) {
                        existingDifficulte.setNature(difficulte.getNature());
                    }
                    if (difficulte.getAutreNature() != null) {
                        existingDifficulte.setAutreNature(difficulte.getAutreNature());
                    }
                    if (difficulte.getDescription() != null) {
                        existingDifficulte.setDescription(difficulte.getDescription());
                    }
                    if (difficulte.getSolution() != null) {
                        existingDifficulte.setSolution(difficulte.getSolution());
                    }
                    if (difficulte.getObservation() != null) {
                        existingDifficulte.setObservation(difficulte.getObservation());
                    }

                    return existingDifficulte;
                }
            )
            .map(difficulteRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Difficulte> findAll(Pageable pageable) {
        log.debug("Request to get all Difficultes");
        return difficulteRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Difficulte> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all Difficultes");
        return difficulteRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Difficulte> findOne(Long id) {
        log.debug("Request to get Difficulte : {}", id);
        return difficulteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Difficulte : {}", id);
        difficulteRepository.deleteById(id);
    }
}
