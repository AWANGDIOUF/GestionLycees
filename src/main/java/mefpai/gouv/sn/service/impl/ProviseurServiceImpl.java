package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Proviseur;
import mefpai.gouv.sn.repository.ProviseurRepository;
import mefpai.gouv.sn.service.ProviseurService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Proviseur}.
 */
@Service
@Transactional
public class ProviseurServiceImpl implements ProviseurService {

    private final Logger log = LoggerFactory.getLogger(ProviseurServiceImpl.class);

    private final ProviseurRepository proviseurRepository;

    public ProviseurServiceImpl(ProviseurRepository proviseurRepository) {
        this.proviseurRepository = proviseurRepository;
    }

    @Override
    public Proviseur save(Proviseur proviseur) {
        log.debug("Request to save Proviseur : {}", proviseur);
        return proviseurRepository.save(proviseur);
    }

    @Override
    public Optional<Proviseur> partialUpdate(Proviseur proviseur) {
        log.debug("Request to partially update Proviseur : {}", proviseur);

        return proviseurRepository
            .findById(proviseur.getId())
            .map(
                existingProviseur -> {
                    if (proviseur.getNomPrenom() != null) {
                        existingProviseur.setNomPrenom(proviseur.getNomPrenom());
                    }

                    return existingProviseur;
                }
            )
            .map(proviseurRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Proviseur> findAll(Pageable pageable) {
        log.debug("Request to get all Proviseurs");
        return proviseurRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Proviseur> findOne(Long id) {
        log.debug("Request to get Proviseur : {}", id);
        return proviseurRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proviseur : {}", id);
        proviseurRepository.deleteById(id);
    }
}
