package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Enseignant;
import mefpai.gouv.sn.repository.EnseignantRepository;
import mefpai.gouv.sn.service.EnseignantService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Enseignant}.
 */
@Service
@Transactional
public class EnseignantServiceImpl implements EnseignantService {

    private final Logger log = LoggerFactory.getLogger(EnseignantServiceImpl.class);

    private final EnseignantRepository enseignantRepository;

    public EnseignantServiceImpl(EnseignantRepository enseignantRepository) {
        this.enseignantRepository = enseignantRepository;
    }

    @Override
    public Enseignant save(Enseignant enseignant) {
        log.debug("Request to save Enseignant : {}", enseignant);
        return enseignantRepository.save(enseignant);
    }

    @Override
    public Optional<Enseignant> partialUpdate(Enseignant enseignant) {
        log.debug("Request to partially update Enseignant : {}", enseignant);

        return enseignantRepository
            .findById(enseignant.getId())
            .map(
                existingEnseignant -> {
                    if (enseignant.getMatriculeEns() != null) {
                        existingEnseignant.setMatriculeEns(enseignant.getMatriculeEns());
                    }
                    if (enseignant.getNomPrenom() != null) {
                        existingEnseignant.setNomPrenom(enseignant.getNomPrenom());
                    }
                    if (enseignant.getSexe() != null) {
                        existingEnseignant.setSexe(enseignant.getSexe());
                    }
                    if (enseignant.getTelephone() != null) {
                        existingEnseignant.setTelephone(enseignant.getTelephone());
                    }
                    if (enseignant.getMail() != null) {
                        existingEnseignant.setMail(enseignant.getMail());
                    }
                    if (enseignant.getGrade() != null) {
                        existingEnseignant.setGrade(enseignant.getGrade());
                    }
                    if (enseignant.getOption() != null) {
                        existingEnseignant.setOption(enseignant.getOption());
                    }
                    if (enseignant.getSituationMatrimoniale() != null) {
                        existingEnseignant.setSituationMatrimoniale(enseignant.getSituationMatrimoniale());
                    }
                    if (enseignant.getStatus() != null) {
                        existingEnseignant.setStatus(enseignant.getStatus());
                    }
                    if (enseignant.getFonction() != null) {
                        existingEnseignant.setFonction(enseignant.getFonction());
                    }

                    return existingEnseignant;
                }
            )
            .map(enseignantRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Enseignant> findAll(Pageable pageable) {
        log.debug("Request to get all Enseignants");
        return enseignantRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Enseignant> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all Enseignants");
        return enseignantRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Enseignant> findOne(Long id) {
        log.debug("Request to get Enseignant : {}", id);
        return enseignantRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enseignant : {}", id);
        enseignantRepository.deleteById(id);
    }
}
