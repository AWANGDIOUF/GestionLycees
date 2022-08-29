package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.PersonnelAdministratif;
import mefpai.gouv.sn.repository.PersonnelAdministratifRepository;
import mefpai.gouv.sn.service.PersonnelAdministratifService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PersonnelAdministratif}.
 */
@Service
@Transactional
public class PersonnelAdministratifServiceImpl implements PersonnelAdministratifService {

    private final Logger log = LoggerFactory.getLogger(PersonnelAdministratifServiceImpl.class);

    private final PersonnelAdministratifRepository personnelAdministratifRepository;

    public PersonnelAdministratifServiceImpl(PersonnelAdministratifRepository personnelAdministratifRepository) {
        this.personnelAdministratifRepository = personnelAdministratifRepository;
    }

    @Override
    public PersonnelAdministratif save(PersonnelAdministratif personnelAdministratif) {
        log.debug("Request to save PersonnelAdministratif : {}", personnelAdministratif);
        return personnelAdministratifRepository.save(personnelAdministratif);
    }

    @Override
    public Optional<PersonnelAdministratif> partialUpdate(PersonnelAdministratif personnelAdministratif) {
        log.debug("Request to partially update PersonnelAdministratif : {}", personnelAdministratif);

        return personnelAdministratifRepository
            .findById(personnelAdministratif.getId())
            .map(
                existingPersonnelAdministratif -> {
                    if (personnelAdministratif.getMatricule() != null) {
                        existingPersonnelAdministratif.setMatricule(personnelAdministratif.getMatricule());
                    }
                    if (personnelAdministratif.getNom() != null) {
                        existingPersonnelAdministratif.setNom(personnelAdministratif.getNom());
                    }
                    if (personnelAdministratif.getPrenom() != null) {
                        existingPersonnelAdministratif.setPrenom(personnelAdministratif.getPrenom());
                    }
                    if (personnelAdministratif.getSituationMatrimoniale() != null) {
                        existingPersonnelAdministratif.setSituationMatrimoniale(personnelAdministratif.getSituationMatrimoniale());
                    }
                    if (personnelAdministratif.getFonction() != null) {
                        existingPersonnelAdministratif.setFonction(personnelAdministratif.getFonction());
                    }
                    if (personnelAdministratif.getAutreFonction() != null) {
                        existingPersonnelAdministratif.setAutreFonction(personnelAdministratif.getAutreFonction());
                    }
                    if (personnelAdministratif.getTelephone() != null) {
                        existingPersonnelAdministratif.setTelephone(personnelAdministratif.getTelephone());
                    }
                    if (personnelAdministratif.getMail() != null) {
                        existingPersonnelAdministratif.setMail(personnelAdministratif.getMail());
                    }

                    return existingPersonnelAdministratif;
                }
            )
            .map(personnelAdministratifRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PersonnelAdministratif> findAll(Pageable pageable) {
        log.debug("Request to get all PersonnelAdministratifs");
        return personnelAdministratifRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PersonnelAdministratif> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all PersonnelAdministratifs");
        return personnelAdministratifRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PersonnelAdministratif> findOne(Long id) {
        log.debug("Request to get PersonnelAdministratif : {}", id);
        return personnelAdministratifRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PersonnelAdministratif : {}", id);
        personnelAdministratifRepository.deleteById(id);
    }
}
