package mefpai.gouv.sn.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import mefpai.gouv.sn.domain.LyceesTechniques;
import mefpai.gouv.sn.repository.LyceesTechniquesRepository;
import mefpai.gouv.sn.service.LyceesTechniquesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link LyceesTechniques}.
 */
@Service
@Transactional
public class LyceesTechniquesServiceImpl implements LyceesTechniquesService {

    private final Logger log = LoggerFactory.getLogger(LyceesTechniquesServiceImpl.class);

    private final LyceesTechniquesRepository lyceesTechniquesRepository;

    public LyceesTechniquesServiceImpl(LyceesTechniquesRepository lyceesTechniquesRepository) {
        this.lyceesTechniquesRepository = lyceesTechniquesRepository;
    }

    @Override
    public LyceesTechniques save(LyceesTechniques lyceesTechniques) {
        log.debug("Request to save LyceesTechniques : {}", lyceesTechniques);
        return lyceesTechniquesRepository.save(lyceesTechniques);
    }

    @Override
    public Optional<LyceesTechniques> partialUpdate(LyceesTechniques lyceesTechniques) {
        log.debug("Request to partially update LyceesTechniques : {}", lyceesTechniques);

        return lyceesTechniquesRepository
            .findById(lyceesTechniques.getId())
            .map(
                existingLyceesTechniques -> {
                    if (lyceesTechniques.getNomLycee() != null) {
                        existingLyceesTechniques.setNomLycee(lyceesTechniques.getNomLycee());
                    }

                    return existingLyceesTechniques;
                }
            )
            .map(lyceesTechniquesRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LyceesTechniques> findAll(Pageable pageable) {
        log.debug("Request to get all LyceesTechniques");
        return lyceesTechniquesRepository.findAll(pageable);
    }

    /**
     *  Get all the lyceesTechniques where LyceeTechnique is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LyceesTechniques> findAllWhereLyceeTechniqueIsNull() {
        log.debug("Request to get all lyceesTechniques where LyceeTechnique is null");
        return StreamSupport
            .stream(lyceesTechniquesRepository.findAll().spliterator(), false)
            .filter(lyceesTechniques -> lyceesTechniques.getLyceeTechnique() == null)
            .collect(Collectors.toList());
    }

    /**
     *  Get all the lyceesTechniques where Proviseur is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LyceesTechniques> findAllWhereProviseurIsNull() {
        log.debug("Request to get all lyceesTechniques where Proviseur is null");
        return StreamSupport
            .stream(lyceesTechniquesRepository.findAll().spliterator(), false)
            .filter(lyceesTechniques -> lyceesTechniques.getProviseur() == null)
            .collect(Collectors.toList());
    }

    /**
     *  Get all the lyceesTechniques where DirecteurEtude is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LyceesTechniques> findAllWhereDirecteurEtudeIsNull() {
        log.debug("Request to get all lyceesTechniques where DirecteurEtude is null");
        return StreamSupport
            .stream(lyceesTechniquesRepository.findAll().spliterator(), false)
            .filter(lyceesTechniques -> lyceesTechniques.getDirecteurEtude() == null)
            .collect(Collectors.toList());
    }

    /**
     *  Get all the lyceesTechniques where ComptableFinancie is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LyceesTechniques> findAllWhereComptableFinancieIsNull() {
        log.debug("Request to get all lyceesTechniques where ComptableFinancie is null");
        return StreamSupport
            .stream(lyceesTechniquesRepository.findAll().spliterator(), false)
            .filter(lyceesTechniques -> lyceesTechniques.getComptableFinancie() == null)
            .collect(Collectors.toList());
    }

    /**
     *  Get all the lyceesTechniques where ComptableMatiere is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LyceesTechniques> findAllWhereComptableMatiereIsNull() {
        log.debug("Request to get all lyceesTechniques where ComptableMatiere is null");
        return StreamSupport
            .stream(lyceesTechniquesRepository.findAll().spliterator(), false)
            .filter(lyceesTechniques -> lyceesTechniques.getComptableMatiere() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LyceesTechniques> findOne(Long id) {
        log.debug("Request to get LyceesTechniques : {}", id);
        return lyceesTechniquesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LyceesTechniques : {}", id);
        lyceesTechniquesRepository.deleteById(id);
    }
}
