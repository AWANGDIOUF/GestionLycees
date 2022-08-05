package mefpai.gouv.sn.service.impl;

import java.util.Optional;
import mefpai.gouv.sn.domain.OrganeGestion;
import mefpai.gouv.sn.repository.OrganeGestionRepository;
import mefpai.gouv.sn.service.OrganeGestionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OrganeGestion}.
 */
@Service
@Transactional
public class OrganeGestionServiceImpl implements OrganeGestionService {

    private final Logger log = LoggerFactory.getLogger(OrganeGestionServiceImpl.class);

    private final OrganeGestionRepository organeGestionRepository;

    public OrganeGestionServiceImpl(OrganeGestionRepository organeGestionRepository) {
        this.organeGestionRepository = organeGestionRepository;
    }

    @Override
    public OrganeGestion save(OrganeGestion organeGestion) {
        log.debug("Request to save OrganeGestion : {}", organeGestion);
        return organeGestionRepository.save(organeGestion);
    }

    @Override
    public Optional<OrganeGestion> partialUpdate(OrganeGestion organeGestion) {
        log.debug("Request to partially update OrganeGestion : {}", organeGestion);

        return organeGestionRepository
            .findById(organeGestion.getId())
            .map(
                existingOrganeGestion -> {
                    if (organeGestion.getType() != null) {
                        existingOrganeGestion.setType(organeGestion.getType());
                    }
                    if (organeGestion.getAutreType() != null) {
                        existingOrganeGestion.setAutreType(organeGestion.getAutreType());
                    }
                    if (organeGestion.getFonctionnel() != null) {
                        existingOrganeGestion.setFonctionnel(organeGestion.getFonctionnel());
                    }
                    if (organeGestion.getActivite() != null) {
                        existingOrganeGestion.setActivite(organeGestion.getActivite());
                    }
                    if (organeGestion.getDateActivite() != null) {
                        existingOrganeGestion.setDateActivite(organeGestion.getDateActivite());
                    }
                    if (organeGestion.getRapport() != null) {
                        existingOrganeGestion.setRapport(organeGestion.getRapport());
                    }
                    if (organeGestion.getRapportContentType() != null) {
                        existingOrganeGestion.setRapportContentType(organeGestion.getRapportContentType());
                    }

                    return existingOrganeGestion;
                }
            )
            .map(organeGestionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrganeGestion> findAll(Pageable pageable) {
        log.debug("Request to get all OrganeGestions");
        return organeGestionRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrganeGestion> findByUserIsCurrentUser(Pageable pageable) {
        log.debug("Request to get all OrganeGestions");
        return organeGestionRepository.findByUserIsCurrentUser(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrganeGestion> findOne(Long id) {
        log.debug("Request to get OrganeGestion : {}", id);
        return organeGestionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrganeGestion : {}", id);
        organeGestionRepository.deleteById(id);
    }
}
