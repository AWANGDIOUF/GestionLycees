package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Concours;
import mefpai.gouv.sn.repository.ConcoursRepository;
import mefpai.gouv.sn.service.ConcoursService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Concours}.
 */
@Service
@Transactional
public class ConcoursServiceImpl implements ConcoursService {

    private final Logger log = LoggerFactory.getLogger(ConcoursServiceImpl.class);

    private final ConcoursRepository concoursRepository;

    public ConcoursServiceImpl(ConcoursRepository concoursRepository) {
        this.concoursRepository = concoursRepository;
    }

    @Override
    public Concours save(Concours concours) {
        log.debug("Request to save Concours : {}", concours);
        return concoursRepository.save(concours);
    }

    @Override
    public Optional<Concours> partialUpdate(Concours concours) {
        log.debug("Request to partially update Concours : {}", concours);

        return concoursRepository
            .findById(concours.getId())
            .map(
                existingConcours -> {
                    if (concours.getNomConcours() != null) {
                        existingConcours.setNomConcours(concours.getNomConcours());
                    }
                    if (concours.getDateOuverture() != null) {
                        existingConcours.setDateOuverture(concours.getDateOuverture());
                    }
                    if (concours.getDateCloture() != null) {
                        existingConcours.setDateCloture(concours.getDateCloture());
                    }
                    if (concours.getNbreCandidats() != null) {
                        existingConcours.setNbreCandidats(concours.getNbreCandidats());
                    }
                    if (concours.getDateConcours() != null) {
                        existingConcours.setDateConcours(concours.getDateConcours());
                    }
                    if (concours.getDateDeliberation() != null) {
                        existingConcours.setDateDeliberation(concours.getDateDeliberation());
                    }
                    if (concours.getNbreAdmis() != null) {
                        existingConcours.setNbreAdmis(concours.getNbreAdmis());
                    }

                    return existingConcours;
                }
            )
            .map(concoursRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Concours> findAll(Pageable pageable) {
        log.debug("Request to get all Concours");
        return concoursRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Concours> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all Concours");
        return concoursRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Concours> findOne(Long id) {
        log.debug("Request to get Concours : {}", id);
        return concoursRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Concours : {}", id);
        concoursRepository.deleteById(id);
    }
}
