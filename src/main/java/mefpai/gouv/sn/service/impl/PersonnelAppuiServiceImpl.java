package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.PersonnelAppui;
import mefpai.gouv.sn.repository.PersonnelAppuiRepository;
import mefpai.gouv.sn.service.PersonnelAppuiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link PersonnelAppui}.
 */
@Service
@Transactional
public class PersonnelAppuiServiceImpl implements PersonnelAppuiService {

    private final Logger log = LoggerFactory.getLogger(PersonnelAppuiServiceImpl.class);

    private final PersonnelAppuiRepository personnelAppuiRepository;

    public PersonnelAppuiServiceImpl(PersonnelAppuiRepository personnelAppuiRepository) {
        this.personnelAppuiRepository = personnelAppuiRepository;
    }

    @Override
    public PersonnelAppui save(PersonnelAppui personnelAppui) {
        log.debug("Request to save PersonnelAppui : {}", personnelAppui);
        return personnelAppuiRepository.save(personnelAppui);
    }

    @Override
    public Optional<PersonnelAppui> partialUpdate(PersonnelAppui personnelAppui) {
        log.debug("Request to partially update PersonnelAppui : {}", personnelAppui);

        return personnelAppuiRepository
            .findById(personnelAppui.getId())
            .map(
                existingPersonnelAppui -> {
                    if (personnelAppui.getNom() != null) {
                        existingPersonnelAppui.setNom(personnelAppui.getNom());
                    }
                    if (personnelAppui.getPrenom() != null) {
                        existingPersonnelAppui.setPrenom(personnelAppui.getPrenom());
                    }
                    if (personnelAppui.getSituationMatrimoniale() != null) {
                        existingPersonnelAppui.setSituationMatrimoniale(personnelAppui.getSituationMatrimoniale());
                    }
                    if (personnelAppui.getFonction() != null) {
                        existingPersonnelAppui.setFonction(personnelAppui.getFonction());
                    }
                    if (personnelAppui.getAutreFoction() != null) {
                        existingPersonnelAppui.setAutreFoction(personnelAppui.getAutreFoction());
                    }
                    if (personnelAppui.getTelephone() != null) {
                        existingPersonnelAppui.setTelephone(personnelAppui.getTelephone());
                    }
                    if (personnelAppui.getMail() != null) {
                        existingPersonnelAppui.setMail(personnelAppui.getMail());
                    }

                    return existingPersonnelAppui;
                }
            )
            .map(personnelAppuiRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PersonnelAppui> findAll(Pageable pageable) {
        log.debug("Request to get all PersonnelAppuis");
        return personnelAppuiRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PersonnelAppui> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all PersonnelAppuis");
        return personnelAppuiRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<PersonnelAppui> findOne(Long id) {
        log.debug("Request to get PersonnelAppui : {}", id);
        return personnelAppuiRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete PersonnelAppui : {}", id);
        personnelAppuiRepository.deleteById(id);
    }
}
