package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.Localisation;
import mefpai.gouv.sn.repository.LocalisationRepository;
import mefpai.gouv.sn.service.LocalisationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Localisation}.
 */
@Service
@Transactional
public class LocalisationServiceImpl implements LocalisationService {

    private final Logger log = LoggerFactory.getLogger(LocalisationServiceImpl.class);

    private final LocalisationRepository localisationRepository;

    public LocalisationServiceImpl(LocalisationRepository localisationRepository) {
        this.localisationRepository = localisationRepository;
    }

    @Override
    public Localisation save(Localisation localisation) {
        log.debug("Request to save Localisation : {}", localisation);
        return localisationRepository.save(localisation);
    }

    @Override
    public Optional<Localisation> partialUpdate(Localisation localisation) {
        log.debug("Request to partially update Localisation : {}", localisation);

        return localisationRepository
            .findById(localisation.getId())
            .map(
                existingLocalisation -> {
                    if (localisation.getRegion() != null) {
                        existingLocalisation.setRegion(localisation.getRegion());
                    }
                    if (localisation.getDepartementDakar() != null) {
                        existingLocalisation.setDepartementDakar(localisation.getDepartementDakar());
                    }
                    if (localisation.getDepartementDiourbel() != null) {
                        existingLocalisation.setDepartementDiourbel(localisation.getDepartementDiourbel());
                    }
                    if (localisation.getDepartementFatick() != null) {
                        existingLocalisation.setDepartementFatick(localisation.getDepartementFatick());
                    }
                    if (localisation.getDepartementKaffrine() != null) {
                        existingLocalisation.setDepartementKaffrine(localisation.getDepartementKaffrine());
                    }
                    if (localisation.getDepartementKaolack() != null) {
                        existingLocalisation.setDepartementKaolack(localisation.getDepartementKaolack());
                    }
                    if (localisation.getDepartementKedougou() != null) {
                        existingLocalisation.setDepartementKedougou(localisation.getDepartementKedougou());
                    }
                    if (localisation.getDepartementKolda() != null) {
                        existingLocalisation.setDepartementKolda(localisation.getDepartementKolda());
                    }
                    if (localisation.getDepartementLouga() != null) {
                        existingLocalisation.setDepartementLouga(localisation.getDepartementLouga());
                    }
                    if (localisation.getDepartementMatam() != null) {
                        existingLocalisation.setDepartementMatam(localisation.getDepartementMatam());
                    }
                    if (localisation.getDepartementSaint() != null) {
                        existingLocalisation.setDepartementSaint(localisation.getDepartementSaint());
                    }
                    if (localisation.getDepartementSedhiou() != null) {
                        existingLocalisation.setDepartementSedhiou(localisation.getDepartementSedhiou());
                    }
                    if (localisation.getDepartementTambacounda() != null) {
                        existingLocalisation.setDepartementTambacounda(localisation.getDepartementTambacounda());
                    }
                    if (localisation.getDepartementThis() != null) {
                        existingLocalisation.setDepartementThis(localisation.getDepartementThis());
                    }
                    if (localisation.getDepartementZic() != null) {
                        existingLocalisation.setDepartementZic(localisation.getDepartementZic());
                    }
                    if (localisation.getIa() != null) {
                        existingLocalisation.setIa(localisation.getIa());
                    }

                    return existingLocalisation;
                }
            )
            .map(localisationRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Localisation> findAll(Pageable pageable) {
        log.debug("Request to get all Localisations");
        return localisationRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Localisation> findOne(Long id) {
        log.debug("Request to get Localisation : {}", id);
        return localisationRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Localisation : {}", id);
        localisationRepository.deleteById(id);
    }
}
