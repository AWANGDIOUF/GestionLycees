package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Formation;
import mefpai.gouv.sn.repository.FormationRepository;
import mefpai.gouv.sn.service.FormationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Formation}.
 */
@Service
@Transactional
public class FormationServiceImpl implements FormationService {

    private final Logger log = LoggerFactory.getLogger(FormationServiceImpl.class);

    private final FormationRepository formationRepository;

    public FormationServiceImpl(FormationRepository formationRepository) {
        this.formationRepository = formationRepository;
    }

    @Override
    public Formation save(Formation formation) {
        log.debug("Request to save Formation : {}", formation);
        return formationRepository.save(formation);
    }

    @Override
    public Optional<Formation> partialUpdate(Formation formation) {
        log.debug("Request to partially update Formation : {}", formation);

        return formationRepository
            .findById(formation.getId())
            .map(
                existingFormation -> {
                    if (formation.getNomFormation() != null) {
                        existingFormation.setNomFormation(formation.getNomFormation());
                    }
                    if (formation.getTypeFormation() != null) {
                        existingFormation.setTypeFormation(formation.getTypeFormation());
                    }
                    if (formation.getNiveauFormation() != null) {
                        existingFormation.setNiveauFormation(formation.getNiveauFormation());
                    }
                    if (formation.getDuree() != null) {
                        existingFormation.setDuree(formation.getDuree());
                    }
                    if (formation.getSecteur() != null) {
                        existingFormation.setSecteur(formation.getSecteur());
                    }
                    if (formation.getModalite() != null) {
                        existingFormation.setModalite(formation.getModalite());
                    }

                    return existingFormation;
                }
            )
            .map(formationRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Formation> findAll(Pageable pageable) {
        log.debug("Request to get all Formations");
        return formationRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Formation> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all Formation");
        return formationRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Formation> findOne(Long id) {
        log.debug("Request to get Formation : {}", id);
        return formationRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Formation : {}", id);
        formationRepository.deleteById(id);
    }
}
